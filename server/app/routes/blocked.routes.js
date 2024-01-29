import express from "express";
import blockedHandler from "../handlers/blocked.handler.js";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";

const router = express.Router();

// Get an image
router.post("/report", needOnboardedMiddleware, blockedHandler.block);

export default router;
