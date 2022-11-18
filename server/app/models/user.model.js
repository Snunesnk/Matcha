import { sql, request } from "../services/db-request.service.js";

export class User {
    constructor(data) {
        const user = typeof data === 'object' ? data : {};

        this.login = user.login;
        this.password = user.password;
        this.email = user.email;
        this.name = user.name;
        this.surname = user.surname;
    }

    static async create(newUser) {
        // Can check for password
        // Can check for email
        // etc.
        return request.create('user', newUser)
    }

    static async getAll() {
        return request.read('user', {});
        // return new Promise((resolve, reject) => {
        //     sql.query(
        //         query,
        //         (err, res) => {
        //             if (err) {
        //                 reject(err);
        //                 return ;
        //             }
        //             resolve(res);
        //         }
        //     )
        // })
    }

    // static async findByLogin(login) {
        // console.log(`looking for user: ${login}`);
        // return new Promise((resolve, reject) => {
        //     sql.query(`SELECT * FROM user WHERE login LIKE '%${login}'`, (err, res) => {
        //         if (err) {
        //             reject(err);
        //             return ;
        //         }
    
        //         if (res.length === 0) {    
        //             // could not find User with given id
        //             reject({ kind: "not_found" });
        //             return ;
        //         }

        //         resolve(res[0]);
        //     });
        // });
    // }

    // static getAllVerified(result) {
    //     sql.query("SELECT * FROM user WHERE verified LIKE '%true'", (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }

    //         console.log("users: ", res);
    //         result(null, res);
    //     });
    // }

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