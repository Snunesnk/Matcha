export class Blocked {
  constructor(obj = {}) {
    this.userLogin = obj.userLogin;
    this.blockedLogin = obj.blockedLogin;
  }

  get userLogin() {
    return this._userLogin;
  }

  set userLogin(userLogin) {
    this._userLogin = userLogin;
  }

  get blockedLogin() {
    return this._blockedLogin;
  }

  set blockedLogin(blockedLogin) {
    this._blockedLogin = blockedLogin;
  }

  static async create(newBlocked) {
    const data = await DbRequestService.create(
      "blocked",
      new Blocked(newBlocked)
    );
    if (data.affectedRows === 0) {
      return null;
    }
    return await Blocked.getBlockedByLogin(newBlocked.blockedLogin);
  }

  static async getAllBlockedByLogin(login) {
    const data = await DbRequestService.read("blocked", {
      blocker: `${login}`,
    });
    return data.map((blocked) => new Blocked(blocked));
  }
}
