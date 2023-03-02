import express from "express";
import tagHandler from "../handlers/tag.handler.js"

const router = express.Router();

// Retrieve all Tags
router.get("/tag/", tagHandler.getTagsTypeAhead);

export default router