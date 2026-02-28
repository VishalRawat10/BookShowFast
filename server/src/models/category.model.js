import mongoose from 'mongoose';
import Event from "./event.model.js";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true });

categorySchema.post("findOneAndDelete", async (category) => {
    if (category) {
        await Event.updateMany(
            { category: category._id },
            { $pull: { category: category._id } }
        );
    }
})

const Category = mongoose.model('Category', categorySchema);

export default Category;