import express from "express";
import blockedHandler from "../handlers/blocked.handler";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware";

const router = express.Router();

// Get an image
router.post("/blocked", needOnboardedMiddleware, blockedHandler.block);

export default router;
