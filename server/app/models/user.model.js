import { DbRequestService } from "../services/db-request.service.js";
import { comparePassword } from "../services/password.service.js";
import rand from "rand-token";
import { sendEmail } from "../services/send-mail.service.js";

export class User {
  constructor(obj = {}) {
    this.login = obj.login;
    this.password = obj.password;
    this.email = obj.email;
    this.name = obj.name;
    this.surname = obj.surname;
    this.verified = obj.verified;
    this.token = obj.token;
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

  get verified() {
    return this._verified;
  }

  set verified(verified) {
    if (verified === true || verified === "true" || verified === 1) {
      this._verified = true;
      return;
    }
    this._verified = false;
  }

  async passwordMatch(password) {
    return await comparePassword(password, this.password);
  }

  static async sendVerificationMail(user) {
    const token = user.token;
    const login = user.login;
    const email = user.email;
    const message = `${process.env.FRONT_URL}/onboarding/verify/?login=${login}&token=${token}`;

    try {
      return await sendEmail(email, "Verify your email", message);
    } catch (error) {
      console.log(error);
    }
  }

  static async create(newUser) {
    const data = await DbRequestService.create("user", newUser);
    if (data.affectedRows === 0) {
      return null;
    }
    return await User.getUserByLogin(newUser.login);
  }

  static async getAllUsers(filters = {}) {
    const data = await DbRequestService.read("user", filters);
    return data.map((user) => new User({ ...user, password: "XXXXX" }));
  }

  static async getUserByLogin(login) {
    const data = await DbRequestService.read("user", { login: `${login}` });
    if (data.length === 0) {
      return null;
    }
    return new User({
      ...data[0],
      password: "XXXXX",
    });
  }

  static async getFullUserByLogin(login) {
    const data = await DbRequestService.read("user", { login: `${login}` });
    if (data.length === 0) {
      return null;
    }
    return new User({
      ...data[0],
    });
  }

  static async getAllVerified() {
    return DbRequestService.read("user", { verified: `true` });
  }

  static async updateByLogin(login, user) {
    if (user.email !== undefined) {
      user.verified = false;
      user.token = rand.suid(16);
    }
    const data = await DbRequestService.update("user", user, {
      login: `${login}`,
    });
    if (data.affectedRows === 0) {
      return null;
    }
    if (user.email !== undefined) {
      await User.sendVerificationMail(user);
    }
    return await User.getUserByLogin(login);
  }

  static async deleteByLogin(login) {
    return DbRequestService.delete("user", { login: `${login}` });
  }

  toJSON() {
    return {
      login: this.login,
      password: this.password,
      email: this.email,
      name: this.name,
      surname: this.surname,
      verified: this.verified,
      token: this.token,
    };
  }
}
