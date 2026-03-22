import { userSchema, eventSchema, venueSchema, categorySchema } from "../services/joi.services.js";
import ExpressError from "../utils/ExpressError.js";
import { getSafeUser } from "../utils/utils.js";

export const validateUser = (req, res, next) => {
    const user = getSafeUser(req.body);
    const { error } = userSchema.validate(user);

    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }
    next();
}

export const validateEvent = (req, res, next) => {
    if (req.file) {
        req.body.banner = { url: req.file.path, filename: req.file.filename };
    }

    const { title, slug, description, banner, category, language, duration, status } = req.body;

    const { error } = eventSchema.validate({ title, slug, description, banner, category, language, duration, status });

    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }

    next();
}

export const validateVenue = (req, res, next) => {
    const { name, city, address, capacity, sections, seatLayout, status } = req.body;

    const { error } = venueSchema.validate({ name, city, address, capacity, sections, seatLayout, status });

    if (error) return next(new ExpressError(400, error.details[0].message));

    next();
}

export const validateCategory = (req, res, next) => {

    if (req.file) {
        req.body.icon = { url: req.file.path, filename: req.file.filename };
    }

    const { name, description, icon } = req.body;

    const { error } = categorySchema.validate({ name, description, icon });

    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }

    next();
}