import mysql from "mysql2";
import _ from "lodash";
import { HOST, USER, PASSWORD, DB } from "../config/db.config.js";

// Create a connection to the database
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB,
});

// temporary, will be removed after I'm done with coding agnostic db requests
export const sql = connection

export class DbRequestService {
// Used to ensure our dynamically forged request won't break trying to reach for a table that does not exist
    static allowedTableUse = [
        "user",
        "tag",
        "view",
        "user_preferences",
        "user_tag",
        "user_pictures",
        "user_tag",
    ];

    static async create(tableName, objectToAdd) {
        return new Promise((resolve, reject) => {

            if (!this.allowedTableUse.includes(tableName)) {
                reject(new Error("Table does not exist in database"))
            }

            const query = `INSERT INTO ${tableName} SET ?`;
            const params = [objectToAdd];

            connection.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                    return ;
                }
                resolve(res);
            });  
        });
    }

    static async read(tableName, filters = {}) {
        return new Promise((resolve, reject) => {
            if (!this.allowedTableUse.includes(tableName)) {
                reject(new Error("Table does not exist in database"))
            }

            let query = `SELECT * FROM ${tableName}`;
            const queryFilters = _.transform(_.toPairs(filters), (result, keyValue, index) => {
                const field = keyValue[0];
                let value = keyValue[1];
                const startsWith = index === 0 ? 'WHERE' : 'AND';

                // In case of a boolean, mysql requires the '%' to interprete it correctly
                if (value === 'false' || value === 'true') {
                    value = `%${value}`
                }
                query += ` ${startsWith} ${field} LIKE ?`
                result.push(value);
            }, []);

            connection.query(query, queryFilters, (err, res) => {
                if (err) {
                    reject(err);
                    return ;
                }
                resolve(res);
            });  
        });
    }
}