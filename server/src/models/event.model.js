import mongoose from 'mongoose';
import Show from './show.model.js';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    banner: {
        url: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        }
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    language: {
        type: String,
    },
    duration: {
        type: Number, // in minutes
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
    },
}, { timestamps: true });

eventSchema.post("findOneAndDelete", async (event) => {
    if (event) {
        await Show.deleteMany({ eventId: event._id });
    }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;