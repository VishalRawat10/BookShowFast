import mongoose from "mongoose";
import { getEnv } from "../utils/env.utils.js";

export default async function connectDB() {
    await mongoose.connect(getEnv("MONGODB_URI"));
    console.log("Mongoose is connected successfully ✅...");
}