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
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.last_message_id = obj.last_message_id;
    this.last_message_timestamp = obj.last_message_timestamp;
    this.name = obj.name;
    this.surname = obj.surname;
    this.login = obj.login;
    this.imgA = obj.imgA;
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

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get created_at() {
    return this._created_at;
  }

  set created_at(created_at) {
    this._created_at = created_at;
  }

  get last_message_id() {
    return this._last_message_id;
  }

  set last_message_id(last_message_id) {
    this._last_message_id = last_message_id;
  }

  get last_message_timestamp() {
    return this._last_message_timestamp;
  }

  set last_message_timestamp(last_message_timestamp) {
    this._last_message_timestamp = last_message_timestamp;
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

  get login() {
    return this._login;
  }

  set login(login) {
    this._login = login;
  }

  get imgA() {
    return this._imgA;
  }

  set imgA(imgA) {
    this._imgA = imgA;
  }

  static async create(newMatch) {
    try {
      const match = new Match(newMatch);
      const data = await DbRequestService.create("matches", {
        user1: match.user1,
        user2: match.user2,
      });
      if (data.affectedRows === 0) {
        return null;
      }
    } catch (error) {
      console.log("Error when creating match, probably already exists");
    }
    return newMatch;
  }

  static async getMatches(login) {
    const matches = await DbRequestService.getMatches(login);
    if (matches.length === 0) {
      return null;
    }

    return matches.map((match) => new Match(match).toJSON());
  }

  static async getMatch(user1, user2) {
    const userMatch = new Match({ user1: user1, user2: user2 });
    const match = await DbRequestService.read("matches", {
      user1: `${userMatch.user1}`,
      user2: `${userMatch.user2}`,
    });
    if (match.length === 0) {
      return null;
    }
    return new Match(match[0]);
  }

  static async deleteMatch(user1, user2) {
    return DbRequestService.delete("matches", {
      user1: `${user1}`,
      user2: `${user2}`,
    });
  }

  static async deleteAllMatches(user) {
    return DbRequestService.delete("matches", {
      user1: `${user}`,
    });
  }

  toJSON() {
    return {
      user1: this.user1,
      user2: this.user2,
      id: this.id,
      created_at: this.created_at,
      last_message_id: this.last_message_id,
      last_message_timestamp: this.last_message_timestamp,
      name: this.name,
      surname: this.surname,
      login: this.login,
      imgA: this.imgA,
    };
  }
}
