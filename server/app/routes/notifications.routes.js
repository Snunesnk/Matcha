import express from "express";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";
import notificationsHandler from "../handlers/notifications.handler.js";

const router = express.Router();

// Get all new matches for one user
router.get(
  "/notifications",
  needOnboardedMiddleware,
  notificationsHandler.getNotifications
);

router.get(
  "/notifications/count",
  needOnboardedMiddleware,
  notificationsHandler.getNotificationCount
);

router.put(
  "/notifications/read/",
  needOnboardedMiddleware,
  notificationsHandler.readMessages
);

router.put(
  "/notifications/read/:login",
  needOnboardedMiddleware,
  notificationsHandler.readConvFromLogin
);


export default router;
