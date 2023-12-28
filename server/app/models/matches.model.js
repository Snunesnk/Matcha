import { DbRequestService } from "../services/db-request.service.js";

export class Match {
  constructor(obj = {}) {
    if (obj.user1 > obj.user2) {
      this.user1 = obj.user1;
      this.user2 = obj.user2;
    } else {
      this.user1 = obj.user2;
      this.user2 = obj.user1;
    }
  }

  get user1() {
    return this._user1;
  }

  set user1(user1) {
    this._user1 = user1;
  }

  get user2() {
    return this._user2;
  }

  set user2(user2) {
    this._user2 = user2;
  }

  static async create(newMatch) {
    try {
      const data = await DbRequestService.create(
        "matches",
        new Match(newMatch)
      );
      if (data.affectedRows === 0) {
        return null;
      }
    } catch (error) {
      console.log("Error when creating match, probably already exists");
    }
    return newMatch;
  }
}
