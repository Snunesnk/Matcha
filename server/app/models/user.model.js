import { DbRequestService } from "../services/db-request.service.js";

export class User {
    constructor({login, password, email, name, surname}) {
        this.login = login || '';
        this.password = password || '';
        this.email = email || '';
        this.name = name || '';
        this.surname = surname || '';
    }

    static async create(newUser) {
        return DbRequestService.create('user', newUser)
    }

    static async getAllUsers(filters = {}) {
        return DbRequestService.read('user', filters);
    }

    static async getUserByLogin(login) {
        return DbRequestService.read('user', { login: `${login}`});
    }

    static async getAllVerified() {
        return DbRequestService.read('user', { verified: `true`});
    }

    static updateByLogin(login, user) {
        return DbRequestService.update('user', user, Object.getOwnPropertyNames(user), { login: `${login}`});
    }

    static deleteByLogin(login) {
        return DbRequestService.delete('user', { login: `${login}`});
    }
}