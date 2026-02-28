import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true,
        index: true
    },
    seats: [
        {
            section: String,
            row: String,
            seatNumber: String
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    bookingStatus: {
        type: String,
        enum: ["reserved", "confirmed", "cancelled"],
        default: "reserved"
    },
    expiresAt: {
        type: Date
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;