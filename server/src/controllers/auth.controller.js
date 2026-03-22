import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import ExpressError from "../utils/ExpressError.js";
import { generateOTP } from "../utils/utils.js";
import sendPasswordResetOTP from "../config/nodemailer.config.js";

const accessTokenCookieOptions = {
    signed: true,
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    secure: true
}

const refreshTokenCookieOptions = {
    signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true
}

export const sendOtp = async (req, res, next) => {
    const { email } = req.body;

    const otp = generateOTP(6);
    const hashedOtp = crypto.hash("sha256", otp, "base64");

    await OTP.deleteMany({ email });

    const otpDoc = new OTP({ otp: hashedOtp, email });

    await otpDoc.save();

    await sendPasswordResetOTP(email, otp);
    return res.status(200).json({ message: "OTP sent successfully." });
}

export const getStarted = async (req, res, next) => {
    const { email, otp } = req.body;

    const hashedOtp = crypto.hash("sha256", otp, "base64");
    const otpDoc = await OTP.findOne({ email, otp: hashedOtp });

    if (!otpDoc) return next(new ExpressError(400, "Incorrect or expired otp."));

    const user = await User.findOneAndUpdate({ email }, {}, { new: true, runValidators: true, upsert: true });

    const [accessToken, refreshToken] = [user.generateAccessToken(), user.generateRefreshToken()];

    user.refreshToken = refreshToken;
    await user.save();

    await OTP.findByIdAndDelete(otpDoc._id);

    const { refreshToken: _, ...userObj } = user.toObject();

    return res.status(200).cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).json({ message: "OTP verified successfully.", user: userObj });
}

export const logout = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.userId, { refreshToken: null }, { new: true, runValidators: true });

    if (!user) return next(new ExpressError(400, "User not found."));

    return res.clearCookie("access-token").clearCookie("refresh-token").status(200).json({
        message: "User logged out successfully."
    });
}

export const getProfile = async (req, res, next) => {
    const user = await User.findById(req.userId);

    if (!user) return next(new ExpressError(400, "User not found."));

    return res.status(200).json({ message: "User details fetched successfully.", user });
}

export const refresh = async (req, res, next) => {
    const refreshToken = req.signedCookies["refresh-token"];

    if (!refreshToken) return next(new ExpressError(403, "Refresh token missing."));

    const decoded = User.verifyRefreshToken(refreshToken);
    if (!decoded) return next(new ExpressError(403, "Unauthorized! Invalid refresh-token."));

    const user = await User.findById(decoded._id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) return next(new ExpressError(403, "Invalid refresh-token."));

    const accessToken = user.generateAccessToken();

    const { refreshToken: _, ...safeUser } = user.toObject();

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).status(200).json({
        message: "Access token re-generated successfully.",
        user: safeUser
    });
}

export const updateProfile = async (req, res, next) => {
    const { name, phone } = req.body;

    const isProfileComplete = Boolean(name);

    const user = await User.findByIdAndUpdate(req.userId, { name, phone, isProfileComplete }, { new: true, runValidators: true });

    return res.status(200).json({ message: "Profile updated successfully.", user });
}

//! to be deleted if not required in future
// export const verifyOtp = async (req, res, next) => {
//     const { email, otp } = req.body;

//     const hashedOtp = crypto.hash("sha512", otp, "base64");
//     const user = await User.findOne({ email, role: "user", otp: hashedOtp, otpExpiry: { $gt: Date.now() } });

//     if (!user) return next(new ExpressError(400, "Incorrect or expired OTP."));

//     const resetToken = user.generateResetToken();

//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     await user.save();

//     return res.status(200).cookie("reset-token", resetToken, resetTokenCookieOptions).json({ message: "OTP verified successfully." });
// }

//* Google controllers
export const googleAuth = async (req, res, next) => {
    const payload = req.payload;
    if (!payload) return next(new ExpressError(400, "Payload missing."));

    let user = await User.findOne({ email: payload.email, role: "user" });
    if (!user) {
        // create user 
        user = new User({
            email: payload.email,
            name: payload.name,
            isProfileComplete: true,
            strategy: "google"
        });
    }
    const [accessToken, refreshToken] = [user.generateAccessToken(), user.generateRefreshToken()];

    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.refreshToken;

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).status(200).json({ message: "User logged in successfully.", user: userObj });
}
