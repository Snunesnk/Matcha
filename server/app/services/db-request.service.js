import mysql from "mysql2";
import _ from "lodash";
import { HOST, USER, PASSWORD, DB } from "../config/db.config.js";
import { query } from "express";

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
    "conversations",
    "messages",
    "blocked",
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
        queryCondition += ` ${startsWith} \`${field}\` ${likeOrNot} ?`;
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
            queryCommand += ` ${startsWith} \`${field}\` = ST_GeomFromText(?)`;
          } else {
            queryCommand += ` ${startsWith} \`${field}\` = ?`;
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

      const query = `INSERT IGNORE INTO \`${tableName}\` SET ?`;
      const params = _.pick(
        objectToAdd,
        Object.entries(objectToAdd)
          .filter(([key, value]) => value)
          .map(([key]) => key.replace("_", ""))
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

  static async delete(tableName, filters = {}) {
    return new Promise((resolve, reject) => {
      if (!this.allowedTableUse.includes(tableName)) {
        reject(new Error("Table does not exist in database"));
      }

      const { queryCondition, queryFilters } =
        this._computeQueryCondition(filters);
      const query = `DELETE FROM \`${tableName}\`` + queryCondition;

      connection.query(query, queryFilters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  static async getMatchList(matchingParameters, userFilters) {
    return new Promise((resolve, reject) => {
      const genderPreferences = [];
      if (matchingParameters.enby) genderPreferences.push("nb");
      if (matchingParameters.male) genderPreferences.push("m");
      if (matchingParameters.female) genderPreferences.push("f");

      const parameters = [
        matchingParameters.login,
        ...userFilters.tags,
        matchingParameters.login,
        ...genderPreferences,
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
  u.surname,
  u.login,
  u.bio,
  u.rating,
  u.gender,
  u.latitude,
  u.longitude,
  GROUP_CONCAT(ut.tagBwid ORDER BY ut.tagBwid ASC SEPARATOR ', ') AS tags,
  CASE WHEN n.type IS NULL THEN 0 ELSE 1 END AS alreadySeen,
  COALESCE(tc.tagCount, 0) AS tagMatchCount,
  COALESCE(matchingTags.tagCount, 0) AS commonTagsCount,
  ST_Distance_Sphere(u.coordinate, currentUser.coordinate) * 0.001 AS distance,
  CASE
    WHEN l.receiver IS NOT NULL THEN 'true'
    ELSE 'false'
  END AS userLiked
FROM
  user u
  INNER JOIN userSettings us ON u.login = us.userLogin
  INNER JOIN user currentUser ON currentUser.login = ?
  INNER JOIN userSettings currentUs ON currentUser.login = currentUs.userLogin
  LEFT JOIN userTag ut ON u.login = ut.userLogin
  LEFT JOIN notifications n ON u.login = n.login AND n.type = 'visit' AND n.trigger_login = currentUser.login
  LEFT JOIN blocked b1 ON u.login = b1.blocked AND currentUser.login = b1.blocker
  LEFT JOIN blocked b2 ON currentUser.login = b2.blocked AND u.login = b2.blocker
  LEFT JOIN \`like\` l ON u.login = l.issuer AND currentUser.login = l.receiver
  LEFT JOIN (
    SELECT
      ut.userLogin,
      COUNT(*) AS tagCount
    FROM
      userTag ut\n`;
      if (userFilters.tags && userFilters.tags.length > 0) {
        query += `
          WHERE
            ut.tagBwid IN (?`;
        for (let i = 1; i < userFilters.tags.length; i++) {
          query += ", ?";
        }
        query += `)\n`;
      }
      query += `
    GROUP BY ut.userLogin
  ) tc ON tc.userLogin = u.login
  LEFT JOIN (
    SELECT 
      ut1.userLogin, 
      COUNT(*) as tagCount
    FROM 
      userTag ut1
      INNER JOIN user currentUser ON currentUser.login = ?
      INNER JOIN userTag ut2 ON ut1.tagBwid = ut2.tagBwid AND ut2.userLogin = currentUser.login
    WHERE 
      ut1.userLogin <> currentUser.login
    GROUP BY 
      ut1.userLogin
  ) matchingTags ON u.login = matchingTags.userLogin
WHERE
    u.login <> currentUser.login
    AND b1.blocker IS NULL AND b2.blocker IS NULL
    AND u.verified = 1
    AND u.onboarded = 1
    AND u.gender IN (?`;
      for (let i = 1; i < genderPreferences.length; i++) {
        query += ", ?";
      }
      query += `)\n
    AND TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE()) >= currentUs.ageMin
    AND (
      currentUs.ageMax >= 55 
      OR currentUs.ageMax IS NULL
      OR TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE()) <= currentUs.ageMax
    )
    AND u.rating BETWEEN currentUs.fameMin AND currentUs.fameMax
    AND ST_Distance_Sphere(u.coordinate, currentUser.coordinate) BETWEEN currentUs.distMin * 1000 AND currentUs.distMax * 1000\n`;

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
      AND TIMESTAMPDIFF(YEAR, currentUser.dateOfBirth, CURDATE()) >= us.ageMin
      AND (
        us.ageMax >= 55 
        OR us.ageMax IS NULL
        OR TIMESTAMPDIFF(YEAR, currentUser.dateOfBirth, CURDATE()) <= us.ageMax
      )
      AND currentUser.rating BETWEEN us.fameMin AND us.fameMax
      AND ST_Distance_Sphere(currentUser.coordinate, u.coordinate) <= us.distMax * 1000
      AND NOT EXISTS (
        SELECT 1 FROM \`like\` WHERE issuer = currentUser.login AND receiver = u.login
      )
      `;

      // Apply all filters
      if (userFilters.ageMin) {
        query +=
          `
          AND TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE()) >= ` +
          userFilters.ageMin;
      }
      if (userFilters.ageMax && userFilters.ageMax < 55) {
        query +=
          `
          AND TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE()) <= ` +
          userFilters.ageMax;
      }
      if (userFilters.distMax) {
        query +=
          `
          AND ST_Distance_Sphere(u.coordinate, currentUser.coordinate) <= ` +
          userFilters.distMax * 1000;
      }
      if (userFilters.fameMin) {
        query +=
          `
          AND u.rating >= ` + userFilters.fameMin;
      }

      query += `
      GROUP BY u.login
      ORDER BY alreadySeen ASC,`;

      switch (userFilters.sort) {
        case "Age":
          query += " TIMESTAMPDIFF(YEAR, u.dateOfBirth, CURDATE())";
          break;
        case "Popularity":
          query += " u.rating";
          break;
        case "Distance":
          query += " ST_Distance_Sphere(currentUser.coordinate, u.coordinate)";
          break;
        case "Tags":
          query += " tagMatchCount";
          break;
        default:
          query += " u.rating";
      }

      query += userFilters.sortDirection
        ? " " + userFilters.sortDirection
        : " DESC";

      query += `, u.rating DESC, commonTagsCount DESC`;

      connection.query(query, parameters, (err, res) => {
        if (err) {
          console.log(err);
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
    SELECT liker.name AS likerName, liker.imgA AS likerImgA, likee.name AS likeeName, likee.imgA AS likeeImgA 
FROM
    user liker
    INNER JOIN userSettings likerSettings ON liker.login = likerSettings.userLogin
    INNER JOIN user likee ON likee.login = ?
    LEFT JOIN userSettings likeeSettings ON likee.login = likeeSettings.userLogin
    LEFT JOIN blocked b1 ON likee.login = b1.blocked AND liker.login = b1.blocker
    LEFT JOIN blocked b2 ON liker.login = b2.blocked AND likee.login = b2.blocker
WHERE
    liker.login = ?
    AND b1.blocker IS NULL AND b2.blocker IS NULL
    AND (
        (liker.gender = 'm' AND likee.prefMale) OR
        (liker.gender = 'f' AND likee.prefFemale) OR
        (liker.gender = 'nb' AND likee.prefEnby)
    )
    AND TIMESTAMPDIFF(YEAR, liker.dateOfBirth, CURDATE()) >= likeeSettings.ageMin
    AND (
      likeeSettings.ageMax >= 55 
      OR likeeSettings.ageMax IS NULL
      OR TIMESTAMPDIFF(YEAR, liker.dateOfBirth, CURDATE()) <= likeeSettings.ageMax
    )
    AND liker.rating BETWEEN likeeSettings.fameMin AND likeeSettings.fameMax
    AND ST_Distance_Sphere(liker.coordinate, likee.coordinate) <= likeeSettings.distMax * 1000
    AND (
        (likee.gender = 'm' AND liker.prefMale) OR
        (likee.gender = 'f' AND liker.prefFemale) OR
        (likee.gender = 'nb' AND liker.prefEnby)
    )
    AND TIMESTAMPDIFF(YEAR, likee.dateOfBirth, CURDATE()) >= likerSettings.ageMin
    AND (
      likerSettings.ageMax >= 55 
      OR likerSettings.ageMax IS NULL
      OR TIMESTAMPDIFF(YEAR, likee.dateOfBirth, CURDATE()) <= likerSettings.ageMax
    )
    AND likee.rating BETWEEN likerSettings.fameMin AND likerSettings.fameMax
    AND ST_Distance_Sphere(likee.coordinate, liker.coordinate) <= likerSettings.distMax * 1000;
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

  static async getMatches(login) {
    return new Promise((resolve, reject) => {
      const parameters = [login, login, login, login];
      const query = `
  SELECT
    m.*,
    c.last_message_id,
    msg.timestamp AS last_message_timestamp,
    msg.message_content AS last_message_content,
    u.name,
    u.login,
    u.surname,
    u.imgA,
    CASE 
      WHEN n.trigger_login = ? THEN 1
      ELSE n.read
    END AS \`read\`
  FROM
    matches m
  LEFT JOIN
    conversations c ON m.id = c.match_id
  LEFT JOIN
    messages msg ON c.last_message_id = msg.message_id
  LEFT JOIN
      notifications n ON n.message_id = msg.message_id
  LEFT JOIN
    user u ON u.login = CASE
      WHEN m.user1 = ? THEN m.user2
      ELSE m.user1
    END
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

  static async countAllUsers() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT COUNT(*) AS count FROM user
    `;

      connection.query(query, (err, res) => {
        if (err) {
          reject(err);
          return 0;
        }
        resolve(res[0].count);
      });
    });
  }

  static async getConversationFromLogins(login1, login2) {
    return new Promise((resolve, reject) => {
      const parameters = [login1, login2, login2, login1];
      const query = `
      SELECT
        c.conversation_id,
        c.match_id,
        c.last_message_id
      FROM
        conversations c
      WHERE
        c.match_id = (
          SELECT
            m.id
          FROM
            matches m
          WHERE
            (m.user1 = ? AND m.user2 = ?)
            OR (m.user1 = ? AND m.user2 = ?)
        )
    `;

      connection.query(query, parameters, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res[0]);
      });
    });
  }

  static async getNotificationsForLogin(login) {
    return new Promise((resolve, reject) => {
      const parameters = [login];
      const query = `
      SELECT
        n.id,
        n.type,
        n.created_at,
        n.read,
        u.name,
        u.imgA
      FROM
        notifications n
      LEFT JOIN user u ON n.trigger_login = u.login
      WHERE
        n.login = ? AND n.type != 'message'
      ORDER BY n.created_at DESC, n.id DESC
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
