import express from "express";
import imagesHandler from "../handlers/images.handler.js";

const router = express.Router();

// Get an image
router.get("/server/src/app/uploads/:image", imagesHandler.getImage);

export default router;
