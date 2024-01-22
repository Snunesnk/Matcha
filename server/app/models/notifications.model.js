import { DbRequestService } from "../services/db-request.service.js";
import { sendNotification } from "../socket/socket.js";

export class Notifications {
  constructor(obj = {}) {
    this.login = obj.login;
    this.trigger_login = obj.trigger_login;
    this.type = obj.type;
    this.message = obj.message;
    this.created_at = obj.created_at;
    this.read = obj.read;
  }

  get login() {
    return this._login;
  }

  set login(login) {
    this._login = login;
  }

  get trigger_login() {
    return this._trigger_login;
  }

  set trigger_login(trigger_login) {
    this._trigger_login = trigger_login;
  }

  get type() {
    return this._type;
  }

  set type(type) {
    this._type = type;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  get created_at() {
    return this._created_at;
  }

  set created_at(created_at) {
    this._created_at = created_at;
  }

  get read() {
    return this._read;
  }

  set read(read) {
    this._read = read;
  }

  static async create(newNotification) {
    const data = await DbRequestService.create(
      "notifications",
      new Notifications(newNotification)
    );
    if (data.affectedRows === 0) {
      return null;
    }

    // Send socket notification
    sendNotification(newNotification.login, newNotification.type);

    return newNotification;
  }

  static async getNotifications(login) {
    const data = await DbRequestService.read("notifications", {
      login: `${login}`,
    });
    if (data.length === 0) {
      return null;
    }
    return data.map((notification) => new Notifications(notification));
  }

  static async getUnreadNotifications(login) {
    const data = await DbRequestService.read("notifications", {
      login: `${login}`,
      read: 0,
    });
    if (data.length === 0) {
      return null;
    }
    return data.map((notification) => new Notifications(notification));
  }

  toJSON() {
    return {
      login: this.login,
      trigger_login: this.trigger_login,
      type: this.type,
      message: this.message,
      created_at: this.created_at,
      read: this.read,
    };
  }
}
