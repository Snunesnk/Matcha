import express from "express";
import tagHandler from "../handlers/tag.handler.js";
import { needVerifiedMiddleware } from "../middlewares/authentication-middleware.js";

const router = express.Router();

// Retrieve all Tags
router.get("/tag/", needVerifiedMiddleware, tagHandler.getTagsTypeAhead);

export default router;
