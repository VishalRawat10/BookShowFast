import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    showDate: {
        type: Date,
        required: true,
        index: true
    },
    showTime: {
        type: String,
        required: true
    },
    pricingBySection: [
        {
            section: String,
            price: Number
        }
    ],
    totalSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["scheduled", "cancelled", "completed"],
        default: "scheduled"
    }
}, { timestamps: true });


const Show = mongoose.model('Show', showSchema);

export default Show;