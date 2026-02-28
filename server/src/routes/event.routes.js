import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controllers/event.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlewares.js";
import { validateEvent } from "../middlewares/joi.middlewares.js";
import multer from "multer";
import { storage } from "../config/cloudinary.config.js";

const upload = multer({ storage: storage });

const router = express.Router();

router.route("/").get(wrapAsync(getEvents)).post(isAuthenticated, isAdmin, upload.single("banner"), validateEvent, wrapAsync(createEvent));

router.route("/:id").get(wrapAsync(getEvent)).put(isAuthenticated, isAdmin, upload.single("banner"), validateEvent, wrapAsync(updateEvent)).delete(isAuthenticated, isAdmin, wrapAsync(deleteEvent));

export default router;