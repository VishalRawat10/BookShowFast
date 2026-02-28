import Venue from "../models/venue.model.js";
import ExpressError from "../utils/ExpressError.js";

export const getVenues = async (req, res, next) => {
    const venues = await Venue.find();

    return res.status(200).json({ message: "Venues fetched successfully.", venues });
}

export const createVenue = async (req, res, next) => {
    const { name, city, address, capacity, sections, seatLayout, status } = req.body;

    const venue = new Venue({ name, city, address, capacity, sections, seatLayout, status });

    await venue.save();
    return res.status(201).json({ message: "Venue created successfully.", venue });
}

export const getVenue = async (req, res, next) => {
    const { id } = req.params;

    const venue = await Venue.findById(id);

    if (!venue) return next(new ExpressError(400, "Venue not found."));

    return res.status(200).json({ message: "Venue fetched successfully.", venue });
}

export const updateVenue = async (req, res, next) => {
    const { id } = req.params;
    const { name, city, address, capacity, sections, seatLayout, status } = req.body;

    const venue = await Venue.findByIdAndUpdate(id, { name, city, address, capacity, sections, seatLayout, status }, { runValidators: true, new: true });

    if (!venue) return next(new ExpressError(400, "Could not find venue."));

    return res.status(200).json({ message: "Venue updated successfully.", venue });
}

export const deleteVenue = async (req, res, next) => {
    const { id } = req.params;

    const venue = await Venue.findByIdAndDelete(id);

    if (!venue) return next(new ExpressError(400, "Could not find venue."));

    return res.status(200).json({ message: "Venue deleted successfully.", venue });
}