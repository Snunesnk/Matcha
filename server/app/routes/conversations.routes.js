import express from "express";

const router = express.Router();

// Get all conversations for one user
router.get("/conversations");

export default router;
