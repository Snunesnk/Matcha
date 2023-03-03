import express from "express";
import blockHandler from "../handlers/block.handler.js"

const router = express.Router();


// Create a new Block
router.post("/block/", blockHandler.create);

// Retrieve all received Blocks for a user
router.get("/block/:receiver", blockHandler.getReceivedBlocks);

// Delete a Block with issuer and reveiver logins
router.delete("/block/:issuer/:reveiver", blockHandler.delete);

export default router