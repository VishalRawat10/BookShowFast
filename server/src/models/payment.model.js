import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        index: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        enum: ["initiated", "success", "failed", "refunded"],
        default: "initiated"
    },
    paymentMethod: {
        type: String
    }
}, { timestamps: true });


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
