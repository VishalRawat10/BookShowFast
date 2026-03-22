import express from "express";
import { getProfile, refresh, logout, googleAuth, sendOtp, getStarted, updateProfile } from "../controllers/auth.controller.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isAuthenticated, verifyGoogleIdToken } from "../middlewares/auth.middlewares.js";
import { validateUser } from "../middlewares/joi.middlewares.js";

const router = express.Router();

router.route("/get-started").post(wrapAsync(getStarted));
router.route("/send-otp").post(wrapAsync(sendOtp));
router.route("/logout").post(isAuthenticated, wrapAsync(logout));
router.route("/profile").get(isAuthenticated, wrapAsync(getProfile)).put(isAuthenticated, validateUser, wrapAsync(updateProfile));
router.route("/refresh").post(wrapAsync(refresh));

//google
router.route("/google").post(verifyGoogleIdToken, wrapAsync(googleAuth));

export default router;