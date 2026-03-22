import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { getEnv } from "../utils/env.utils.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        min: 2,
        max: 30
    },
    strategy: {
        type: String,
        enum: ["local", "google", "facebook", "x"],
        default: "local"
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
    phone: {
        type: String,
        length: 10
    },
    refreshToken: {
        type: String,
        select: false
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id, role: this.role, isProfileComplete: this.isProfileComplete }, getEnv("ACCESS_TOKEN_SECRET"), { expiresIn: '15m' });
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