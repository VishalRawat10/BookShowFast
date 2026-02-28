import express from "express";
import { signup, login, getProfile, refresh, logout, forgotPassword, resetPassword, loginWithGoogle, signupWithGoogle } from "../controllers/auth.controller.js";
import wrapAsync from "../utils/wrapAsync.js";
import { isAuthenticated, verifyGoogleIdToken } from "../middlewares/auth.middlewares.js";
import { validateUser } from "../middlewares/joi.middlewares.js";

const router = express.Router();

router.route("/signup").post(validateUser, wrapAsync(signup));
router.route("/login").post(wrapAsync(login));
router.route("/logout").post(isAuthenticated, wrapAsync(logout));
router.route("/profile").get(isAuthenticated, wrapAsync(getProfile));
router.route("/refresh").post(wrapAsync(refresh));
router.route("/forgot-password").post(wrapAsync(forgotPassword));
router.route("/reset-password").post(wrapAsync(resetPassword));

//google
router.route("/google/login").post(verifyGoogleIdToken, wrapAsync(loginWithGoogle));
router.route("/google/signup").post(verifyGoogleIdToken, wrapAsync(signupWithGoogle));

export default router;