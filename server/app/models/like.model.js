import { DbRequestService } from "../services/db-request.service.js";
import { Match } from "./matches.model.js";
import { Notifications } from "./notifications.model.js";
import { NOTIFICATION_TYPE, sendNotification } from "../socket/socket.js";
export class Like {
  constructor(obj = {}) {
    this.receiver = obj.receiver;
    this.issuer = obj.issuer;
  }

  get receiver() {
    return this._receiver;
  }

  set receiver(receiver) {
    this._receiver = receiver;
  }

  get issuer() {
    return this._issuer;
  }

  set issuer(issuer) {
    this._issuer = issuer;
  }

  static async create(newLike) {
    const data = await DbRequestService.create("like", new Like(newLike));
    if (data.affectedRows === 0) {
      return null;
    }
    return newLike;
  }

  static async getLike(like) {
    const data = await DbRequestService.read("like", like);
    if (data.length === 0) {
      return null;
    }
    return new Like(data[0]);
  }

  static async getMatches(receiver) {
    const issued = await Like.getIssuedLikes(receiver);
    const received = await Like.getReceivedLikes(receiver);
    if (issued === null || received === null) {
      return null;
    }
    const matches = [];
    for (let i = 0; i < issued.length; i++) {
      for (let j = 0; j < received.length; j++) {
        if (issued[i].issuer === received[j].receiver) {
          matches.push(issued[i].issuer);
        }
      }
    }
    return matches;
  }

  static async getReceivedLikes(receiver) {
    const data = await DbRequestService.read("like", {
      receiver: `${receiver}`,
    });
    if (data.length === 0) {
      return null;
    }
    const received = new Like(data[0]);
    // need to filter all received likes that we also issued
    const issued = await await DbRequestService.read("like", {
      issuer: `${receiver}`,
    });
    if (issued === null) {
      return received;
    }
    const filtered = [];
    for (let i = 0; i < received.length; i++) {
      for (let j = 0; j < issued.length; j++) {
        if (received[i].issuer !== issued[j].issuer) {
          filtered.push(received[i]);
        }
      }
    }
    return filtered;
  }

  static async getIssuedLikes(issuer) {
    const data = await DbRequestService.read("like", { issuer: `${issuer}` });
    if (data.length === 0) {
      return null;
    }
    const issued = new Like(data[0]);
    // need to filter all issued likes that we also received
    const received = await DbRequestService.read("like", {
      receiver: `${issuer}`,
    });
    if (received === null) {
      return issued;
    }
    const filtered = [];
    for (let i = 0; i < issued.length; i++) {
      for (let j = 0; j < received.length; j++) {
        if (issued[i].issuer !== received[j].issuer) {
          filtered.push(issued[i]);
        }
      }
    }
    return filtered;
  }

  static async delete(receiver, issuer, notif = true) {
    const data = DbRequestService.delete("like", {
      receiver: `${receiver}`,
      issuer: `${issuer}`,
    });
    if (data.affectedRows === 0) {
      return null;
    }

    const match = await Match.getMatch(receiver, issuer);

    if (match) {
      Match.deleteMatch(match.user1, match.user2);
    }

    if (notif) {
      Notifications.create({
        login: receiver,
        trigger_login: issuer,
        type: NOTIFICATION_TYPE.UNLIKE,
        message: `${issuer} unliked you!`,
      });
    }

    return true;
  }

  toJSON() {
    return {
      receiver: this.receiver,
      issuer: this.issuer,
    };
  }
}
