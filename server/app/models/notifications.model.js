import { DbRequestService } from "../services/db-request.service.js";

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
    return newNotification;
  }
}
