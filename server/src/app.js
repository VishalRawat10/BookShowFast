import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js";
import venueRouter from "./routes/venue.routes.js";
import categoryRouter from "./routes/category.routes.js";
import { getEnv } from "./utils/env.utils.js";
import cloudinary from "./config/cloudinary.config.js";

const app = express();

//* Standard middlewares
app.use(cors({
    origin: [getEnv("CLIENT_URL")],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(getEnv("COOKIE_SECRET")));

//* Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/venues", venueRouter);
app.use("/api/v1/category", categoryRouter);

//*404 route
app.use((req, res, next) => {
    return res.status(404).json({ message: "Page not found!" });
});

//? middleware to delete image for unsuccessful item creation
app.use(async (err, req, res, next) => {
    if (req.file) {
        const result = await cloudinary.uploader.destroy(req.file.filename, {
            invalidate: true // Invalidate cached copies on the CDN
        });
        console.log("File deleted: ", result);
    }
    next(err);
});

//!Error handling middleware
app.use((err, req, res, next) => {
    console.log("\n----------------------------------Error---------------------------------\n");
    console.log("❗Error is : ", err);
    console.log("\n----------------------------------Error---------------------------------\n");
    return res.status(err.status || 500).json({ message: err.message || "Internal server error." })
});

export default app;