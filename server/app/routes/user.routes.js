import express from "express";
import userHandler from "../handlers/user.handler.js"

const router = express.Router();

// Login
router.post("/user/login", userHandler.login);

// Create a new User
router.post("/user/", userHandler.create);

// Retrieve all Users
router.get("/user/", userHandler.getAllUsers);

// Retrieve all verified Users
router.get("/user/verified", userHandler.getAllVerified);

// Retrieve a single User with login
router.get("/user/login/:login", userHandler.getUserByLogin);

// Update a User with login
router.put("/user/login/:login", userHandler.update);

// Delete a User with login
router.delete("/user/login/:login", userHandler.delete);

export default router