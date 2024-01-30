import express from "express";
import likeHandler from "../handlers/like.handler.js";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";

const router = express.Router();

// Create a new Like
router.post("/like/", needOnboardedMiddleware, likeHandler.create);
router.post("/dislike/", needOnboardedMiddleware, likeHandler.dislike);

// Retrieve all received Likes for a user
router.get(
  "/like/:receiver",
  needOnboardedMiddleware,
  likeHandler.getReceivedLikes
);

// Retrieve all matched Likes for a user
router.get("/like/:receiver", needOnboardedMiddleware, likeHandler.getMatches);

// Delete a Like with issuer and reveiver logins
router.delete("/like/:receiver", needOnboardedMiddleware, likeHandler.delete);

export default router;
