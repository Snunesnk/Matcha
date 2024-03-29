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
    this.message_id = obj.message_id;
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
    if (login) this._login = login.trim().substring(0, 50);
  }

  get trigger_login() {
    return this._trigger_login;
  }

  set trigger_login(trigger_login) {
    if (trigger_login)
      this._trigger_login = trigger_login.trim().substring(0, 50);
  }

  get type() {
    return this._type;
  }

  set type(type) {
    if (type) this._type = type.trim().substring(0, 50);
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

  get message_id() {
    return this._message_id;
  }

  set message_id(message_id) {
    this._message_id = message_id;
  }

  static async create(newNotification) {
    const name = newNotification.name;
    const imgA = newNotification.imgA;
    newNotification.name = undefined;
    newNotification.imgA = undefined;

    const data = await DbRequestService.create(
      "notifications",
      new Notifications(newNotification)
    );
    if (data.affectedRows === 0) {
      return null;
    }

    // Send socket notification
    sendNotification(newNotification.login, newNotification.type, {
      name,
      imgA,
      login: newNotification.trigger_login,
    });

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

  static async updateNotifications(notification, filters) {
    notification.read = 1;
    notification.id = undefined;
    notification.name = undefined;
    notification.imgA = undefined;

    const data = await DbRequestService.update(
      "notifications",
      notification,
      filters
    );

    if (data.affectedRows === 0) {
      return null;
    }
    return data;
  }

  static async getUnreadNotificationsCount(login) {
    const data = await DbRequestService.read("notifications", {
      login: `${login}`,
      read: 0,
    });

    if (data.length === 0) {
      return null;
    }
    return data;
  }

  static async;

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
      message_id: this.message_id,
    };
  }
}
