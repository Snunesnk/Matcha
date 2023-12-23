import { DbRequestService } from "../services/db-request.service.js";

export class UserSetting {
  constructor(obj = {}) {
    this.userLogin = obj.userLogin;
    this.ageMin = obj.ageMin || 18;
    this.ageMax = obj.ageMax || 55;
    this.distMin = obj.distMin || 0;
    this.distMax = obj.distMax || 100;
    this.fameMin = obj.fameMin || 0;
    this.fameMax = obj.fameMax || 100;
  }

  get userLogin() {
    return this._userLogin;
  }

  set userLogin(userLogin) {
    this._userLogin = userLogin;
  }

  get ageMin() {
    return this._ageMin;
  }

  set ageMin(ageMin) {
    this._ageMin = ageMin;
  }

  get ageMax() {
    return this._ageMax;
  }

  set ageMax(ageMax) {
    this._ageMax = ageMax;
  }

  get distMin() {
    return this._distMin;
  }

  set distMin(distMin) {
    this._distMin = distMin;
  }

  get distMax() {
    return this._distMax;
  }

  set distMax(distMax) {
    this._distMax = distMax;
  }

  get fameMin() {
    return this._fameMin;
  }

  set fameMin(fameMin) {
    this._fameMin = fameMin;
  }

  get fameMax() {
    return this._fameMax;
  }

  set fameMax(fameMax) {
    this._fameMax = fameMax;
  }

  static async create(newUserSetting) {
    const data = await DbRequestService.create(
      "userSettings",
      new UserSetting(newUserSetting)
    );
    if (data.affectedRows === 0) {
      return null;
    }
    return this.getUserSettingByLogin(newUserSetting.userLogin);
  }

  static async getUserSettingByLogin(userLogin) {
    const data = await DbRequestService.read("userSettings", {
      userLogin: `${userLogin}`,
    });
    if (data.length === 0) {
      return null;
    }
    return new UserSetting(data[0]);
  }

  static async updateUserSettingByLogin(userLogin, newUserSetting) {
    const data = await DbRequestService.update("userSettings", newUserSetting, {
      userLogin: `${userLogin}`,
    });
    if (data.affectedRows === 0) {
      return null;
    }
    return this.getUserSettingByLogin(userLogin);
  }

  static async deleteUserSettingByLogin(userLogin) {
    return DbRequestService.delete("userSettings", {
      userLogin: `${userLogin}`,
    });
  }

  toJSON() {
    return {
      userLogin: this.userLogin,
      ageMin: this.ageMin,
      ageMax: this.ageMax,
      distMin: this.distMin,
      distMax: this.distMax,
      fameMin: this.fameMin,
      fameMax: this.fameMax,
    };
  }
}
