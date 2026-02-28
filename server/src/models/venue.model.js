import mongoose from 'mongoose';
import Show from "./show.model.js";

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    sections: [
        {
            name: { type: String, required: true },
            totalSeats: { type: Number, required: true }
        }
    ],
    seatLayout: [
        {
            section: String,
            row: String,
            seatNumber: String
        }
    ],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, { timestamps: true });

venueSchema.post("findOneAndDelete", async (venue) => {
    await Show.deleteMany({ venueId: venue._id });
    await Event.updateMany({ venueId: venue._id }, { status: "inactive" });
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue;