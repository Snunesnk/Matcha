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

export class DbRequestService {
  // Used to ensure our dynamically forged request won't break trying to reach for a table that does not exist
  static allowedTableUse = ["user", "tag", "view", "userTag", "like"];

  /*
   ** UTILS
   */

  static _computeQueryCondition(whereLike = {}, whereNotLike = {}) {
    const filters = { ...whereLike, ...whereNotLike };
    const whereLikeSize = Object.keys(whereLike).length;
    let queryCondition = "";
    const queryFilters = _.transform(
      _.toPairs(filters),
      (result, keyValue, index) => {
        const field = keyValue[0];
        let value = keyValue[1];
        const startsWith = index === 0 ? "WHERE" : "AND";

        // In case of a boolean, mysql requires the '%' to interprete it correctly
        if (value === "false" || value === "true") {
          value = `%${value}`;
        }
        const likeOrNot = index < whereLikeSize ? "LIKE" : "NOT LIKE";
        queryCondition += ` ${startsWith} ${field} ${likeOrNot} ?`;
        result.push(value);
      },
      []
    );
    return { queryCondition, queryFilters };
  }

  static _computeQueryCommand(updatedObject, objectModel) {
    let queryCommand = "";
    const querySetters = _.transform(
      _.toPairs(updatedObject.toJSON()),
      (result, keyValue, index) => {
        const field = keyValue[0];
        const value = keyValue[1];
        if (field === undefined || value === undefined) {
          return;
        }
        const startsWith = result.length === 0 ? "SET" : ",";

        if (objectModel.includes(field)) {
          // In case of a boolean, mysql requires the '%' to interprete it correctly
          if (value === "false" || value === "true") {
            value = `%${value}`;
          }
          // if value has mysql function like POINT(), we don't want to add quotes
          if (typeof value === "string" && value.includes("POINT")) {
            queryCommand += ` ${startsWith} ${field} = ST_GeomFromText(?)`;
          } else {
            queryCommand += ` ${startsWith} ${field} = ?`;
          }
          result.push(value);
        }
      },
      []
    );
    return { queryCommand, querySetters };
  }

  /*
   ** CRUD
   */

  static async create(tableName, objectToAdd) {
    return new Promise((resolve, reject) => {
      if (!this.allowedTableUse.includes(tableName)) {
        reject(new Error("Table does not exist in database"));
      }

      const query = `INSERT INTO ${tableName} SET ?`;
      const params = _.pick(
        objectToAdd,
        Object.getOwnPropertyNames(objectToAdd).map((prop) =>
          prop.replace("_", "")
        )
      );

      connection.query(query, params, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async read(tableName, whereLike = {}, whereNotLike = {}) {
    return new Promise((resolve, reject) => {
      if (!this.allowedTableUse.includes(tableName)) {
        reject(new Error("Table is not allowed to be used"));
      }

      const { queryCondition, queryFilters } = this._computeQueryCondition(
        whereLike,
        whereNotLike
      );
      const query = `SELECT * FROM ${tableName}` + queryCondition;

      connection.query(query, queryFilters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async update(tableName, updatedObject, filters = {}) {
    const objectModel = Object.getOwnPropertyNames(updatedObject).map((prop) =>
      prop.replace("_", "")
    );
    return new Promise((resolve, reject) => {
      if (!this.allowedTableUse.includes(tableName)) {
        reject(new Error("Table does not exist in database"));
      }

      const { queryCommand, querySetters } = this._computeQueryCommand(
        updatedObject,
        objectModel
      );
      const { queryCondition, queryFilters } =
        this._computeQueryCondition(filters);
      const query = `UPDATE ${tableName}` + queryCommand + queryCondition;
      const settersAndFilters = querySetters.concat(queryFilters);

      connection.query(query, settersAndFilters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async delete(tableName, condition) {
    return new Promise((resolve, reject) => {
      if (!this.allowedTableUse.includes(tableName)) {
        reject(new Error("Table does not exist in database"));
      }

      const query = `DELETE FROM ${tableName} WHERE ?`;
      const params = [condition];

      connection.query(query, params, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }
}
