import express from "express";
import { needOnboardedMiddleware } from "../middlewares/authentication-middleware.js";
import matchesHandler from "../handlers/matches.handler.js";

const router = express.Router();

// Get all new matches for one user
router.get("/matches", needOnboardedMiddleware, matchesHandler.getMatches);

export default router;
