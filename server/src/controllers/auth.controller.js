import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.model.js";
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

export const signup = async (req, res, next) => {
    const { email, name, password, role } = req.body;

    if (await User.findOne({ email })) {
        return next(new ExpressError(400, "User already exists with given email."));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email,
        name: name,
        password: hashPassword,
        role
    });

    const [accessToken, refreshToken] = [newUser.generateAccessToken(), newUser.generateRefreshToken()];
    newUser.refreshToken = refreshToken;
    await newUser.save();

    const { refreshToken: r, password: p, ...user } = newUser.toObject();

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).status(201).json({
        message: "User registered successfully.",
        user
    });
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email, !password) return next(new ExpressError(400, "Email and password are required."));

    const user = await User.findOne({ email, role: "user" }).select("+password");

    if (!user) return next(new ExpressError(400, "Incorrect email or password."));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new ExpressError(401, "Incorrect email or password."));

    const [accessToken, refreshToken] = [user.generateAccessToken(), user.generateRefreshToken()];
    user.refreshToken = refreshToken;

    await user.save();

    const { refreshToken: _, password: p, ...safeUser } = user.toObject();

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).status(200).json({
        message: "User logged in  successfully.",
        user: safeUser
    });
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

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new ExpressError(400, "No user exists with the email."));

    const otp = generateOTP();
    const hashedOtp = crypto.hash("sha512", otp, "base64");

    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000 //10 min

    await user.save();

    await sendPasswordResetOTP(email, otp);
    return res.status(200).json({ message: "OTP sent successfully." });
}

export const resetPassword = async (req, res, next) => {
    const { email, otp, password, confirmPassword } = req.body;

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)) return next(new ExpressError(400, "Password must be 8–30 characters long and include uppercase, lowercase, number, and special character."));

    if (password !== confirmPassword) return next(new ExpressError(400, "Confirm password must match password."));

    const hashedOtp = crypto.hash("sha512", otp, "base64");

    const user = await User.findOne({ email, otp: hashedOtp, otpExpiry: { $gt: Date.now() } });

    if (!user) return res.status(404).json({ message: "OTP is invalid or expired." });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
}

//* Google controllers
export const signupWithGoogle = async (req, res, next) => {
    const { payload } = req.payload;
    if (!payload) return next(new ExpressError(400, "Payload missing."));

    if (await User.findOne({ email: payload.email })) {
        return next(new ExpressError(400, "The email is already associated with a user."));
    }

    const newUser = new User({
        email: payload.email,
        name: payload.name,
        isVerified: true,
        strategy: "google"
    });

    const [accessToken, refreshToken] = [user.generateAccessToken(), user.generateRefreshToken()];

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const user = newUser.toObject();
    delete user.refreshToken;

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).status(201).json({ message: "User registed successfully.", user });
}

export const loginWithGoogle = async (req, res, next) => {
    const { payload } = req.body;

    const user = await User.findOne({ email: payload.email, strategy: "google" });

    if (!user) return next(new ExpressError(400, "User not found."));

    const [accessToken, refreshToken] = [user.generateAccessToken(), user.generateRefreshToken()];

    user.refreshToken = refreshToken;
    await user.save();

    return res.cookie("access-token", accessToken, accessTokenCookieOptions).cookie("refresh-token", refreshToken, refreshTokenCookieOptions).status(201).json({ message: "User logged in successfully.", user });
}