import express from "express";
import userHandler from "../handlers/user.handler.js"

const router = express.Router();


// Create a new User
router.post("/user/", userHandler.create);

// Validate User's mail
router.get("/user/verify/:login/:token", userHandler.verifyUser);

// Resend verification mail
router.post("/user/verify/:login", userHandler.resendVerificationMail);

// Retrieve all Users
router.get("/user/", userHandler.getAllUsers);

// Retrieve all verified Users
router.get("/user/verified", userHandler.getAllVerified);

// Login
router.post("/user/login", userHandler.login);

// Retrieve a single User with login
router.get("/user/:login", userHandler.getUserByLogin);

// Update a User with login
router.put("/user/:login", userHandler.update);

// Delete a User with login
router.delete("/user/:login", userHandler.delete);

export default router