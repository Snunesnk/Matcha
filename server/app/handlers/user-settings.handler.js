import { UserSetting } from "../models/user-settings.model.js";

export default class {
  static async getUserSettings(req, res) {
    const data = await UserSetting.getFullUserSettingByLogin(
      req.decodedUser._login
    );
    res.json(data);
  }

  static async updateUserSettings(req, res) {
    const data = await UserSetting.updateUserSettingByLogin(
      req.decodedUser._login,
      req.body
    );
    res.json(data);
  }
}
