import { Notifications } from "../models/notifications.model.js";

export default class {
  static async getNotifications(req, res) {
    const login = req.decodedUser._login;
    const notifications = await Notifications.getNotifications(login);
    if (!notifications) {
      res.json([]);
      return;
    } else res.json(notifications);

    // Update notifications to read
    notifications.forEach((notif) => {
      Notifications.updateNotifications(notif, {
        id: notif.id,
      });
    });
  }

  static async getNotificationCount(req, res) {
    const login = req.decodedUser._login;
    const notifications = await Notifications.getUnreadNotificationsCount(
      login
    );

    if (!notifications) res.json([]);
    else res.json(notifications);
  }

  static async readNotification(req, res) {
    const login = req.decodedUser._login;
    const login2 = req.params.login;
    const notif = new Notifications({ trigger_login: login2 });
    notif.created_at = undefined;

    const data = await Notifications.updateNotifications(notif, {
      type: "message",
      trigger_login: login2,
      login: login,
    });

    res.status(200).send({ count: data?.affectedRows });
  }

  static async deleteNotification(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const notification = await Notifications.deleteNotification(login, login2);
    res.json(notification);
  }
}
