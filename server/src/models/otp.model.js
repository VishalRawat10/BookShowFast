import { model, Schema } from "mongoose";

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
}, { timestamps: true });

const OTP = model("OTP", otpSchema);

export default OTP;