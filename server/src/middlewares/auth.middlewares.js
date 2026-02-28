import { verifyIdToken } from "../config/google.config.js";
import User from "../models/user.model.js";
import ExpressError from "../utils/ExpressError.js";

export const isAuthenticated = async (req, res, next) => {
    const accessToken = req.signedCookies["access-token"];

    if (!accessToken) return next(new ExpressError(401, "Access-Token is not found."));

    const decoded = User.verifyAccessToken(accessToken);

    if (!decoded) return next(new ExpressError(401, "Unauthorized."));

    req.userId = decoded._id;
    req.role = decoded.role;

    next();
}

export const isAdmin = async (req, res, next) => {
    if (req.role !== "admin") {
        return next(new ExpressError(401, "Unauthorized! You are not admin."));
    }

    next();
}

export const verifyGoogleIdToken = async (req, res, next) => {
    const { idToken } = req.body;

    if (!idToken) return next(new ExpressError(401, "ID Token missing."));

    const payload = verifyIdToken(idToken);

    if (!payload) return next(new ExpressError(401, "Invalid or expired ID Token."));

    // Extra security checks
    if (payload.iss !== "https://accounts.google.com") {
        return next(new ExpressError(401, "Invalid issuer."));
    }

    if (!payload.email_verified) {
        return next(new ExpressError(401, "Invalid issuer."));
    }

    req.payload = payload;

    next();
}