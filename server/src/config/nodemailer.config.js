import nodemailer from "nodemailer";
import { getEnv } from "../utils/env.utils.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: getEnv("GOOGLE_EMAIL"),
        pass: getEnv("GOOGLE_EMAIL_PASSWORD"),
    },
});

// Send an email using async/await
export default async function sendAuthOTP(to, otp) {
    const mailOptions = {
        from: `"BookShowFast" <${getEnv("GOOGLE_EMAIL")}>`,
        to: to,
        subject: "Verify your BookShowFast account",
        text: `Welcome to BookShowFast! Your verification code is: ${otp}. This code is valid for 10 minutes.`,
        html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6;">
        
        <div style="display: none; max-height: 0px; overflow: hidden;">
          Use code ${otp} to complete your registration. Valid for 10 minutes.
        </div>

        <div style="padding: 20px 0; text-align: center; border-bottom: 1px solid #eee;">
          <img src="https://res.cloudinary.com/dqaaujz8b/image/upload/v1774189162/logo_jtfdec.png" alt="BookShowFast" style="width: 160px; height: auto;">
        </div>

        <div style="padding: 40px 20px; text-align: center;">
          <h2 style="color: #1a1a1a; font-weight: 600;">Let's get you started!</h2>
          <p style="font-size: 16px; color: #555;">Thanks for joining BookShowFast. To verify your email address and start booking your favorite shows, please enter this code:</p>
          
          <div style="margin: 35px 0;">
            <div style="display: inline-block; font-size: 36px; font-weight: 800; color: #2e86de; letter-spacing: 6px; padding: 20px 40px; border-radius: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef;">
              ${otp}
            </div>
          </div>

          <p style="font-size: 14px; color: #888;">This code will expire in <span style="color: #d63031; font-weight: bold;">10 minutes</span>.</p>
          <p style="font-size: 13px; color: #aaa; margin-top: 25px;">If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.</p>
        </div>

        <div style="padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
          <p style="margin: 5px 0;">© 2026 BookShowFast Pvt Ltd. All rights reserved.</p>
          <p style="margin: 5px 0;">Dehradun, Uttarakhand, India</p>
        </div>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Secure Welcome OTP sent:", info.messageId);
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
}