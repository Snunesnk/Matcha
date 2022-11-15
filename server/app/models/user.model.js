const sql = require("./db.js");

class User {
    constructor(data) {
        const user = typeof data === 'object' ? data : {};

        this.login = user.login;
        this.password = user.password;
        this.email = user.email;
        this.name = user.name;
        this.surname = user.surname;
    }

    static create(newUser) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return ;
                }
                console.log("created user: ", { login: res.insertLogin, ...newUser });
                resolve({ login: res.insertLogin, ...newUser });
            });  
        })
    }

    static findByLogin(login) {
        console.log(`looking for user: ${login}`);
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM user WHERE login LIKE '%${login}'`, (err, res) => {
                if (err) {
                    reject(err);
                    return ;
                }
    
                if (res.length === 0) {    
                    // could not find User with given id
                    reject({ kind: "not_found" });
                    return ;
                }

                resolve(res[0]);
            });
        });
    }

    static getAll(gender, result) {
        let query = "SELECT * FROM user";

        if (gender) {
            query += ` WHERE gender LIKE '%${gender}%'`;
        }

        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("users: ", res);
            result(null, res);
        });
    }

    static getAllVerified(result) {
        sql.query("SELECT * FROM user WHERE verified LIKE '%true'", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("users: ", res);
            result(null, res);
        });
    }

    static updateByLogin(login, user, result) {
        sql.query(
            "UPDATE user SET email = ?, name = ?, surname = ?, bio = ?, gender = ?, login = ?, verified = ?, sexual_interest = ? WHERE login = ?",
            [
                user.email,
                user.name,
                user.surname,
                user.bio,
                user.gender,
                user.login,
                user.verified,
                user.sexual_interest,
                login
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found User with the login
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated user: ", { login: login, ...user });
                result(null, { login: login, ...user });
            }
        );
    }

    static remove(login, result) {
        sql.query("DELETE FROM user WHERE login = ?", login, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the login
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted user with login: ", login);
            result(null, res);
        });
    }

    static removeAll(result) {
        sql.query("DELETE FROM user", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} users`);
            result(null, res);
        });
    }
}

module.exports = User;
