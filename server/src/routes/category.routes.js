import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlewares.js";
import { validateCategory } from "../middlewares/joi.middlewares.js";
import multer from "multer";
import { storage } from "../config/cloudinary.config.js";
import wrapAync from "../utils/wrapAsync.js";

const upload = multer({ storage });

const router = express.Router();

router.route("/").get(isAuthenticated, isAdmin, wrapAync(getCategories)).post(isAuthenticated, isAdmin, upload.single("icon"), validateCategory, wrapAync(createCategory));

router.route("/:id").get(isAuthenticated, isAdmin, wrapAync(getCategory)).put(isAuthenticated, isAdmin, upload.single("icon"), validateCategory, wrapAync(updateCategory)).delete(isAuthenticated, isAdmin, wrapAync(deleteCategory));

export default router;