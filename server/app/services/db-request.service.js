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
  static allowedTableUse = [
    "user",
    "tag",
    "view",
    "userTag",
    "like",
    "userSettings",
    "userSettingsTags",
    "notifications",
    "matches",
  ];

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

      const query = `INSERT INTO \`${tableName}\` SET ?`;
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
      const query = `SELECT * FROM \`${tableName}\`` + queryCondition;

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

  static async getMatchList(matchingParameters) {
    return new Promise((resolve, reject) => {
      const genderPreferences = [];
      if (matchingParameters.enby) genderPreferences.push("nb");
      if (matchingParameters.male) genderPreferences.push("m");
      if (matchingParameters.female) genderPreferences.push("f");

      const parameters = [
        matchingParameters.login,
        ...genderPreferences,
        matchingParameters.ageMin,
        matchingParameters.ageMax,
        matchingParameters.fameMin,
        matchingParameters.fameMax,
        matchingParameters.coordinate,
        matchingParameters.distMin * 1000, // Distances in meters.
        matchingParameters.distMax * 1000,
        ...matchingParameters.tags,
      ];

      let query = `
SELECT DISTINCT
  u.dateOfBirth,
  u.imgA,
  u.imgB,
  u.imgC,
  u.imgD,
  u.imgE,
  u.name,
  u.login,
  u.bio,
  u.rating,
  GROUP_CONCAT(ut.tagBwid ORDER BY ut.tagBwid ASC SEPARATOR ', ') AS tags
FROM
    user u
    INNER JOIN userSettings us ON u.login = us.userLogin
    INNER JOIN user currentUser ON currentUser.login = ?
    INNER JOIN userSettings currentUs ON currentUser.login = currentUs.userLogin
    LEFT JOIN userTag ut ON u.login = ut.userLogin
WHERE
      u.login <> currentUser.login
      AND u.verified = 1
      AND u.onboarded = 1
      AND u.gender IN (?`;

      for (let i = 1; i < genderPreferences.length; i++) {
        query += ", ?";
      }
      query += `)\n
      AND TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE()) BETWEEN ? AND ?
      AND u.rating BETWEEN ? AND ?\n
      AND ST_Distance_Sphere(u.coordinate, ST_GeomFromText(?)) BETWEEN ? AND ?\n`;

      if (matchingParameters.tags.length > 0) {
        query += `
      AND EXISTS (
          SELECT 1
          FROM userTag ut
          WHERE
              ut.userLogin = u.login
              AND ut.tagBwid IN (?`;

        for (let i = 1; i < matchingParameters.tags.length; i++) {
          query += ", ?";
        }

        query += ")\n    )";
      }

      query += `    
      AND (
        (currentUser.gender = 'm' AND u.prefMale = 1) OR
        (currentUser.gender = 'f' AND u.prefFemale = 1) OR
        (currentUser.gender = 'nb' AND u.prefEnby = 1)
      )
      AND TIMESTAMPDIFF(YEAR, currentUser.dateOfBirth, CURDATE()) BETWEEN us.ageMin AND us.ageMax
      AND currentUser.rating BETWEEN us.fameMin AND us.fameMax
      AND ST_Distance_Sphere(currentUser.coordinate, u.coordinate) <= us.distMax
      AND NOT EXISTS (
        SELECT 1 FROM \`like\` WHERE issuer = currentUser.login AND receiver = u.login
      )
      `;

      query += `
      GROUP BY u.login
      ORDER BY u.rating DESC
      `;

      connection.query(query, parameters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async checkForBiDirectionMatch(likee, liker) {
    return new Promise((resolve, reject) => {
      const parameters = [likee, liker];
      const query = `
    SELECT COUNT(*) AS match_count
FROM
    user liker
    INNER JOIN userSettings likerSettings ON liker.login = likerSettings.userLogin
    INNER JOIN user likee ON likee.login = ?
    INNER JOIN userSettings likeeSettings ON likee.login = likeeSettings.userLogin
WHERE
    liker.login = ?
    AND (
        (liker.gender = 'm' AND likee.prefMale) OR
        (liker.gender = 'f' AND likee.prefFemale) OR
        (liker.gender = 'nb' AND likee.prefEnby)
    )
    AND TIMESTAMPDIFF(YEAR, liker.dateOfBirth, CURDATE()) BETWEEN likeeSettings.ageMin AND likeeSettings.ageMax
    AND liker.rating BETWEEN likeeSettings.fameMin AND likeeSettings.fameMax
    AND ST_Distance_Sphere(liker.coordinate, likee.coordinate) <= likeeSettings.distMax
    AND (
        (likee.gender = 'm' AND liker.prefMale) OR
        (likee.gender = 'f' AND liker.prefFemale) OR
        (likee.gender = 'nb' AND liker.prefEnby)
    )
    AND TIMESTAMPDIFF(YEAR, likee.dateOfBirth, CURDATE()) BETWEEN likerSettings.ageMin AND likerSettings.ageMax
    AND likee.rating BETWEEN likerSettings.fameMin AND likerSettings.fameMax
    AND ST_Distance_Sphere(likee.coordinate, liker.coordinate) <= likerSettings.distMax;
    `;

      connection.query(query, parameters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async getMatchListWithConversations(login) {
    return new Promise((resolve, reject) => {
      const parameters = [login];
      const query = `
    SELECT 
      m.*,
      c.conversation_id,
      c.last_message_id
    FROM 
      matches m
    LEFT JOIN conversations c
      ON m.id = c.match_id
    WHERE 
      m.user1 = ? OR m.user2 = ?
      `;

      connection.query(query, parameters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }
}
