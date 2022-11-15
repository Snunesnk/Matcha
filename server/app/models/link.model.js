const sql = require("./db.js");

// constructor
class Link {
    constructor(link) {
        this.like_a = link.likeA;
        this.like_b = link.likeB;
        this.user_a = link.userA;
        this.user_b = link.userB;
    }

    static create(newLink, result) {
        sql.query("INSERT INTO user SET ?", newLink, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created link: ", { login: res.insertLogin, ...newLink });
            result(null, { login: res.insertLogin, ...newLink });
        });
    }
}


// Link.findByLogin = (login, result) => {
//     console.log(`looking for user: ${login}`);
//     sql.query(`SELECT * FROM user WHERE login LIKE '%${login}'`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found user: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found User with the id
//         result({ kind: "not_found" }, null);
//     });
// };

// Link.getAll = (gender, result) => {
//     let query = "SELECT * FROM user";

//     if (gender) {
//         query += ` WHERE gender LIKE '%${gender}%'`;
//     }

//     sql.query(query, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("users: ", res);
//         result(null, res);
//     });
// };

// Link.getAllVerified = result => {
//     sql.query("SELECT * FROM user WHERE verified LIKE '%true'", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("users: ", res);
//         result(null, res);
//     });
// };

// Link.updateByLogin = (login, user, result) => {
//     sql.query(
//         "UPDATE user SET email = ?, name = ?, surname = ?, bio = ?, gender = ?, login = ?, verified = ?, sexual_interest = ? WHERE login = ?",
//         [
//             user.email,
//             user.name,
//             user.surname,
//             user.bio,
//             user.gender,
//             user.login,
//             user.verified,
//             user.sexual_interest,
//             login
//         ],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found User with the login
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated user: ", { login: login, ...user });
//             result(null, { login: login, ...user });
//         }
//     );
// };

// User.remove = (login, result) => {
//     sql.query("DELETE FROM user WHERE login = ?", login, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             // not found User with the login
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         console.log("deleted user with login: ", login);
//         result(null, res);
//     });
// };

// User.removeAll = result => {
//     sql.query("DELETE FROM user", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} users`);
//         result(null, res);
//     });
// };

module.exports = Link;
