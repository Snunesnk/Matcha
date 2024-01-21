import express from "express";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";
import conversationHandler from "../handlers/conversation.handler.js";

const router = express.Router();

// Get all conversations for one user
router.get(
  "/conversations/:matchId",
  needOnboardedMiddleware,
  conversationHandler.getConversation
);

export default router;
