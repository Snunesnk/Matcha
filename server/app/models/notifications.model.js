import { DbRequestService } from "../services/db-request.service.js";
import { sendNotification } from "../socket/socket.js";

export class Notifications {
  constructor(obj = {}) {
    this.id = obj.id;
    this.login = obj.login;
    this.trigger_login = obj.trigger_login;
    this.type = obj.type;
    this.created_at = obj.created_at || new Date(Date.now());
    this.read = obj.read || 0;
    this.name = obj.name;
    this.imgA = obj.imgA;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
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

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get imgA() {
    return this._imgA;
  }

  set imgA(imgA) {
    this._imgA = imgA;
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
    const data = await DbRequestService.getNotificationsForLogin(login);
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

  static async updateNotifications(notification) {
    notification.read = 1;
    const id = notification.id;
    notification.id = undefined;
    notification.name = undefined;
    notification.imgA = undefined;
    const data = await DbRequestService.update("notifications", notification, {
      id: id,
    });
    if (data.affectedRows === 0) {
      return null;
    }
    return data;
  }

  toJSON() {
    return {
      id: this.id,
      login: this.login,
      trigger_login: this.trigger_login,
      type: this.type,
      created_at: this.created_at,
      read: this.read,
      name: this.name,
      imgA: this.imgA,
    };
  }
}
