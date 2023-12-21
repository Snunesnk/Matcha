import express from "express";
import userHandler from "../handlers/user.handler.js";
import picturesUpload from "../middlewares/pictures-upload.js";

const router = express.Router();

// Login
router.post("/user/login", userHandler.login);

// Create a new User
router.post("/user/", userHandler.create);

// Validate User's mail
router.get("/user/verify/:login/:token", userHandler.verifyUser);

// Mark user as onboarded
router.get("/user/onboarded", userHandler.onboardUser);

// Resend verification mail
router.post("/user/verify/:login", userHandler.resendVerificationMail);

// Retrieve all Users
router.get("/user/", userHandler.getAllUsers);

// Retrieve all verified Users
router.get("/user/verified", userHandler.getAllVerified);

// Get current user
router.get("/user/me", userHandler.currentUser);

// Retrieve a single User with login
router.get("/user/:login", userHandler.getUserByLogin);

// Update a User with login (first uploads user's 5 images)
router.put("/user/:login", picturesUpload, userHandler.update);

// Delete a User with login
router.delete("/user/:login", userHandler.delete);

// Send a reset password mail
router.get("/user/reset-password/:email", userHandler.sendResetPasswordMail);

// Reset password
router.post("/user/reset-password", userHandler.resetPassword);

export default router;
