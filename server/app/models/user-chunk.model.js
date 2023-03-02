import rand from "rand-token";

export class UserChunk {
    constructor(obj = {}) {
        this.login = obj.login;
        this.password = obj.password;
        this.email = obj.email;

        this.token = obj.token;

        this.name = obj.name;
        this.surname = obj.surname;

        this.dateOfBirth = obj.dateOfBirth;
    }

    get login() {
        return this._login;
    }

    set login(login) {
        this._login = login;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get token() {
        return this._token;
    }

    set token(token) {
        if (token === undefined) {
            this._token = rand.suid(16);
            return;
        }
        this._token = token;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    set dateOfBirth(dateOfBirth) {
        this._dateOfBirth = dateOfBirth;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get surname() {
        return this._surname;
    }

    set surname(surname) {
        this._surname = surname;
    }

    toJSON() {
        return {
            login: this.login,
            password: this.password,
            email: this.email,
            name: this.name,
            surname: this.surname,
            token: this.token,
            dateOfBirth: this.dateOfBirth,
        };
    }
}