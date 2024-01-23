import express from "express";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";
import userSettingsHandler from "../handlers/user-settings.handler.js";

const router = express.Router();

router.get(
  "/user-settings",
  needOnboardedMiddleware,
  userSettingsHandler.getUserSettings
);

router.post(
  "/user-settings",
  needOnboardedMiddleware,
  userSettingsHandler.updateUserSettings
);

export default router;
