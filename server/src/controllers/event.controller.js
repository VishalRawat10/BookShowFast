import Event from "../models/event.model.js";
import ExpressError from "../utils/ExpressError.js";

export const getEvents = async (req, res, next) => {
    const { category, page = 1, length = 10 } = req.query;

    let events;
    if (category && category.length) {
        events = await Event.aggregate([{ $match: { category } }, { $skip: Number((page - 1) * length) }, { $limit: Number(length) }]);
    } else {
        events = await Event.aggregate([{ $match: {} }, { $skip: Number((page - 1) * length) }, { $limit: Number(length) }]);
    }

    return res.status(200).json({ message: "Events fetched successfully.", events });

}

export const createEvent = async (req, res, next) => {
    const { title, slug, description, category, banner, language, duration, status } = req.body;

    const event = new Event({ title, slug, description, banner, category, language, duration, status });

    await event.save();

    return res.status(201).json({ message: "Event created successfully.", event });
}

export const getEvent = async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) return next(new ExpressError(400, "Event not found."));

    return res.status(200).json({ message: "Eventfetched successfully.", event });
}

export const updateEvent = async (req, res, next) => {
    const { id } = req.params;

    const { title, slug, description, category, banner, language, duration, status } = req.body;

    const event = await Event.findByIdAndUpdate(id, { title, slug, description, category, banner, language, duration, status }, { new: true, runValidators: true });

    if (!event) {
        return next(new ExpressError(404, "Event not found."));
    }

    return res.status(200).json({ message: "Event updated successfully.", event });
}

export const deleteEvent = async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) return next(new ExpressError(404, "Event not found."));

    return res.status(200).json({ message: "Event deleted successfully.", event });
}


