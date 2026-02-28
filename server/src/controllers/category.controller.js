import Category from "../models/category.model.js"
import ExpressError from "../utils/ExpressError.js";

export const getCategories = async (req, res, next) => {
    const categories = await Category.find();

    return res.status(200).json({ message: "Categories fetched successfully.", categories });
}

export const createCategory = async (req, res, next) => {
    const { name, description, icon } = req.body;

    const category = new Category({ name, description, icon });

    await category.save();

    return res.status(201).json({ message: "Category created successfully.", category });
}

export const getCategory = async (req, res, next) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) return next(new ExpressError(400, "Category not found."));

    return res.status(200).json({ message: "Category fetched successfully.", category });
}

export const updateCategory = async (req, res, next) => {

    const { id } = req.params;
    const { name, description, icon } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name, description, icon }, { new: true, runValidators: true });

    return res.status(200).json({ message: "Category updated successfully.", category });
}

export const deleteCategory = async (req, res, next) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) return next(new ExpressError(400, "Category not found."));

    return res.status(200).json({ message: "Category deleted successfully." });
}