import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { getEnv } from "../utils/env.utils.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    strategy: {
        type: String,
        enum: ["local", "google", "facebook", "x"],
        default: "local"
    },
    password: {
        type: String,
        required: function () {
            return this.strategy === "local" ? true : false;
        },
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    refreshToken: {
        type: String,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpiry: Date
}, { timestamps: true });

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id, role: this.role, isVerified: this.isVerified }, getEnv("ACCESS_TOKEN_SECRET"), { expiresIn: '15m' });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, getEnv("REFRESH_TOKEN_SECRET"), { expiresIn: '7d' });
};

// Method to verify access token
userSchema.statics.verifyAccessToken = function (token) {
    return jwt.verify(token, getEnv("ACCESS_TOKEN_SECRET"));
};

// Method to verify refresh token
userSchema.statics.verifyRefreshToken = function (token) {
    return jwt.verify(token, getEnv("REFRESH_TOKEN_SECRET"));
};

const User = mongoose.model('User', userSchema);

export default User;