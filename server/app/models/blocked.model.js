import { DbRequestService } from "../services/db-request.service.js";

export class Blocked {
  constructor(obj = {}) {
    this.blocker = obj.blocker;
    this.blocked = obj.blocked;
  }

  get blocker() {
    return this._blocker;
  }

  set blocker(blocker) {
    this._blocker = blocker;
  }

  get blocked() {
    return this._blocked;
  }

  set blocked(blocked) {
    this._blocked = blocked;
  }

  static async create(newBlocked) {
    if (!newBlocked) {
      return null;
    }

    const blocked = new Blocked(newBlocked);

    const data = await DbRequestService.create("blocked", blocked).catch(
      (err) => {
        console.log(err);
      }
    );

    if (data.affectedRows === 0) {
      return null;
    }

    return data.insertId;
  }

  static async getAllBlockedByLogin(login) {
    if (!login) {
      return null;
    }
    const data = await DbRequestService.read("blocked", {
      blocker: `${login}`,
    });

    if (!data) {
      return null;
    }
    return data.map((blocked) => new Blocked(blocked));
  }

  toJSON() {
    return {
      blocker: this.blocker,
      blocked: this.blocked,
    };
  }
}
