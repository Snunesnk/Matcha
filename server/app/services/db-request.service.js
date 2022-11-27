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

// Used to ensure our dynamically forged request won't break trying to reach for a table that does not exist
const allowedTableUse = [
    "user",
    "tag",
    "view",
    "user_preferences",
    "user_tag",
    "user_pictures",
    "user_tag",
]

// temporary, will be removed after I'm done with coding agnostic db requests
export const sql = connection

export class DbRequestService {
    static async create(tableName, objectToAdd) {
        return new Promise((resolve, reject) => {

            if (!allowedTableUse.includes(tableName)) {
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
            if (!allowedTableUse.includes(tableName)) {
                reject(new Error("Table does not exist in database"))
            }

            const query = `SELECT * FROM ${tableName}`;
            console.log("🚀 ~brichard | file: db-request.service.js ~brichard | line 55 ~brichard | request ~brichard | returnnewPromise ~brichard | query", query)
            const queryFilters = _.toPairs(filters).forEach((keyValue, index) => {
                console.log("🚀 ~brichard | file: db-request.service.js ~brichard | line 56 ~brichard | request ~brichard | queryFilters ~brichard | keyValue", keyValue)
                const field = keyValue[0];
                const value = keyValue[1];
                const startsWith = index === 0 ? 'WHERE' : 'AND';

                // In case of a boolean, mysql requires the '%' to inteerprete it correctly
                if (value === 'false' || value === 'true') {
                    value = `%${value}`
                }
                return `${startsWith} ${field} LIKE ${value}`
            }) || "";
            console.log("🚀 ~brichard | file: db-request.service.js ~brichard | line 66 ~brichard | request ~brichard | queryFilters ~brichard | queryFilters", queryFilters)

            connection.query(query + queryFilters, (err, res) => {
                if (err) {
                    reject(err);
                    return ;
                }
                resolve(res);
            });  
        });
    }
}