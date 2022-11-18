import express from "express";
import userHandler from "../handlers/user.handler.js"

const router = express.Router();

// Create a new User
router.post("/user/", userHandler.create);

// Retrieve all Users
router.get("/user/", userHandler.findAll);

// Retrieve all verified Users
router.get("/user/verified", userHandler.findAllVerified);

// Retrieve a single User with login
router.get("/user/:login", userHandler.findOne);

// Update a User with login
router.put("/user/:login", userHandler.update);

// Delete a User with login
router.delete("/user/:login", userHandler.delete);

// Delete all Users
router.delete("/user/", userHandler.deleteAll);

export default router