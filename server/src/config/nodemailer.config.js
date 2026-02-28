import nodemailer from "nodemailer";
import { getEnv } from "../utils/env.utils.js";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: getEnv("EMAIL"),
        pass: getEnv("PASSWORD"),
    },
});

// Send an email using async/await
export default async function sendPasswordResetOTP(to, otp) {
    const mailOptions = {
        from: `Support Team, BookShowFast Pvt Ltd <${getEnv("EMAIL")}`,
        to: to,
        subject: "Password Reset OTP",
        text: `Dear User,

We received a request to reset your password. 
Please use the following One-Time Password (OTP) to proceed:

${otp}

This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.

Best regards,
Support Team, BookShowFast Pvt Ltd`,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Request</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
        <h3 style="color: #2e86de; letter-spacing: 2px;">${otp}</h3>
        <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
        <br/>
        <p>Best regards,<br/>Support Team, BookShowFast Pvt Ltd</p>
      </div>
    `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent:", info.messageId);

};