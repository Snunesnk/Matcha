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

export default router;
