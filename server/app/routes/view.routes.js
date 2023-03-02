import express from "express";
import viewHandler from "../handlers/view.handler.js"

const router = express.Router();


// Create a new View
router.post("/view/", viewHandler.create);

// Retrieve all received Views for a user
router.get("/view/:receiver", viewHandler.getReceivedViews);

export default router