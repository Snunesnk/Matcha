import { DbRequestService } from "../services/db-request.service.js";
import { UserTag } from "./user-tag.model.js";
import { User } from "./user.model.js";

export class UserSetting {
  constructor(obj = {}) {
    this.userLogin = obj.userLogin;
    this.ageMin = obj.ageMin || 18;
    if (this.ageMin < 18) this.ageMin = 18;
    this.ageMax = obj.ageMax || 55;
    if (this.ageMax > 55) this.ageMax = 5;
    this.distMin = obj.distMin || 0;
    if (this.distMin < 0) this.distMin = 0;
    this.distMax = obj.distMax || 100;
    if (this.distMax > 100) this.distMax = 100;
    this.fameMin = obj.fameMin || 0;
    if (this.fameMin < 0) this.fameMin = 0;
    this.fameMax = obj.fameMax || 100;
    if (this.fameMax > 100) this.fameMax = 100;
    this.prefMale = obj.prefMale;
    this.prefFemale = obj.prefFemale;
    this.prefEnby = obj.prefEnby;
    this.tags = obj.tags;
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

  get prefMale() {
    return this._prefMale;
  }

  set prefMale(prefMale) {
    this._prefMale = prefMale;
  }

  get prefFemale() {
    return this._prefFemale;
  }

  set prefFemale(prefFemale) {
    this._prefFemale = prefFemale;
  }

  get prefEnby() {
    return this._prefEnby;
  }

  set prefEnby(prefEnby) {
    this._prefEnby = prefEnby;
  }

  get tags() {
    return this._tags;
  }

  set tags(tags) {
    this._tags = tags;
  }

  static async create(newUserSetting) {
    try {
      const data = await DbRequestService.create(
        "userSettings",
        new UserSetting(newUserSetting)
      );
      if (data.affectedRows === 0) {
        return null;
      }
    } catch (err) {
      console.log("error while saving user settings", err);
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

  static async getFullUserSettingByLogin(userLogin) {
    const settings = await DbRequestService.read("userSettings", {
      userLogin: `${userLogin}`,
    });
    if (settings.length === 0) {
      return null;
    }

    const user = await User.getUserByLogin(userLogin);
    if (user === null) {
      return null;
    }

    const tagsSetting = await DbRequestService.read("userSettingsTags", {
      userLogin: `${userLogin}`,
    });

    const tags = tagsSetting.map((tag) => tag.tagBwid);

    const data = new UserSetting({
      ...settings[0],
      tags: tags,
      prefMale: user.prefMale,
      prefFemale: user.prefFemale,
      prefEnby: user.prefEnby,
    });

    return data;
  }

  static async updateUserSettingByLogin(userLogin, newUserSetting) {
    if (!newUserSetting) return null;
    const user = new User();
    if (user) {
      user.prefMale = newUserSetting.userPreferences?.indexOf("Female") > -1;
      user.prefFemale = newUserSetting.userPreferences?.indexOf("Female") > -1;
      user.prefEnby =
        newUserSetting.userPreferences?.indexOf("Non-binary") > -1;

      if (user.prefMale || user.prefFemale || user.prefEnby) {
        User.updateByLogin(userLogin, user);
      }
    }

    const settings = new UserSetting(newUserSetting);
    settings.tags = undefined;
    const data = await DbRequestService.update("userSettings", settings, {
      userLogin: `${userLogin}`,
    });
    if (data.affectedRows === 0) {
      return null;
    }

    await DbRequestService.delete("userSettingsTags", {
      userLogin: `${userLogin}`,
    });

    if (newUserSetting.tags) {
      for (const tag of newUserSetting.tags) {
        await DbRequestService.create("userSettingsTags", {
          userLogin: `${userLogin}`,
          tagBwid: tag,
        });
      }
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
      prefMale: this.prefMale,
      prefFemale: this.prefFemale,
      prefEnby: this.prefEnby,
      tags: this.tags,
    };
  }
}
