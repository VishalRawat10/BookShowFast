import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middlewares.js";
import wrapAsync from "../utils/wrapAsync.js";
import { createVenue, deleteVenue, getVenue, getVenues, updateVenue } from "../controllers/venue.controller.js";
import { validateVenue } from "../middlewares/joi.middlewares.js";

const router = express.Router();

router.route("/").get(isAuthenticated, isAdmin, wrapAsync(getVenues)).post(isAuthenticated, isAdmin, validateVenue, wrapAsync(createVenue));

router.route("/:id").get(isAuthenticated, isAdmin, wrapAsync(getVenue)).put(isAuthenticated, isAdmin, validateVenue, wrapAsync(updateVenue)).delete(isAuthenticated, isAdmin, wrapAsync(deleteVenue));

export default router;