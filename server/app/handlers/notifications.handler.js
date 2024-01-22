import { Notifications } from "../models/notifications.model.js";

export default class {
  static async getNotifications(req, res) {
    const login = req.decodedUser._login;
    const notifications = await Notifications.getNotifications(login);
    if (!notifications) res.json([]);
    else res.json(notifications);
  }

  static async deleteNotification(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const notification = await Notifications.deleteNotification(login, login2);
    res.json(notification);
  }
}
