import express from "express";
import likeHandler from "../handlers/like.handler.js"

const router = express.Router();


// Create a new Like
router.post("/like/", likeHandler.create);

// Retrieve all received Likes for a user
router.get("/like/:receiver", likeHandler.getReceivedLikes);

// Retrieve all matched Likes for a user
router.get("/like/:receiver", likeHandler.getMatches);

// Delete a Like with issuer and reveiver logins
router.delete("/like/:issuer/:reveiver", likeHandler.delete);

export default router