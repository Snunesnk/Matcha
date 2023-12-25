import express from "express";
import authenticationHandler from "../handlers/authentication.handler.js";

const router = express.Router();

// Get an image
router.get("/auth/validate", authenticationHandler.validate);

export default router;
