import express from "express";
import userHandler from "../handlers/user.handler.js";
import picturesUpload from "../middlewares/pictures-upload.js";
import {
  needOnboardedMiddleware,
  needVerifiedMiddleware,
} from "../middlewares/authentication-middleware.js";

const router = express.Router();

// TODO: Protect routes is username is 'login', 'verified', ...
// Maybe change route to something else ?
// Maybe diable slash in pseudo too

// TODO: Protect routes based on role

// Create a new User
router.post("/user/", userHandler.create);

// Retrieve all Users
router.get("/user/", userHandler.getAllUsers);

// Login
router.post("/user/login", userHandler.login);

// Validate User's mail
router.get("/user/verify/:login/:token", userHandler.verifyUser);

// Resend verification mail
router.post("/user/verify/:email", userHandler.resendVerificationMail);

// Retrieve all verified Users
router.get("/user/verified", userHandler.getAllVerified);

// Send a reset password mail
router.get("/user/reset-password/:email", userHandler.sendResetPasswordMail);

// Reset password
router.post("/user/reset-password", userHandler.resetPassword);

// Retrieve a single User with login
router.get("/user/:login", userHandler.getUserByLogin);

// Delete a User with login
router.delete("/user/:login", userHandler.delete);

// Update a User with login (first uploads user's 5 images)
router.put("/upload-pictures", needVerifiedMiddleware, picturesUpload);
router.put("/user", needVerifiedMiddleware, userHandler.update);

// Update user location
router.post("/location", needOnboardedMiddleware, userHandler.updateLocation);

// Get a list of matching profile
router.post(
  "/matching-profiles",
  needOnboardedMiddleware,
  userHandler.getMatchingProfile
);
export default router;
