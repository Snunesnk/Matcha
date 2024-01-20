import express from "express";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware";
import conversationHandler from "../handlers/conversation.handler";

const router = express.Router();

// Get all conversations for one user
router.get(
  "/conversations/:login",
  needOnboardedMiddleware,
  conversationHandler.getConversation
);

export default router;
