import express from "express";
import likeHandler from "../handlers/likes.handler.js"

const router = express.Router();


// Create a new Likes
router.post("/likes/", likeHandler.create);

// Retrieve all received Likes for a user
router.get("/likes/:receiver", likeHandler.getReceivedLikes);

// Retrieve all matched Likes for a user
router.get("/likes/:receiver", likeHandler.getMatches);

// Delete a Likes with issuer and reveiver logins
router.delete("/likes/:issuer/:reveiver", likeHandler.delete);

export default router