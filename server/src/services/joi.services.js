import Joi from "joi";
import mongoose from "mongoose";

export const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            "any.required": "Name is required.",
            "string.base": "Name must be a string.",
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 2 characters long.",
            "string.max": "Name cannot exceed 30 characters."
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email is required.",
            "string.base": "Email must be a string.",
            "string.empty": "Email is required.",
            "string.email": "Please enter a valid email address."
        }),

    password: Joi.string()
        .pattern(
            new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"
            )
        )
        .required()
        .messages({
            "any.required": "Password is required.",
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be 8–30 characters long and include uppercase, lowercase, number, and special character."
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.required": "Confirm password is required.",
            "any.only": "Confirm password must match password.",
            "string.empty": "Confirm password is required."
        }),

    role: Joi.string()
        .valid("user", "admin")
        .default("user")
        .messages({
            "any.only": "Role must be either 'user' or 'admin'."
        })
});

export const eventSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required()
        .messages({
            "any.required": "Event title is required.",
            "string.empty": "Title is required",
            "string.min": "Title must be at least 2 characters",
            "string.max": "Title cannot exceed 150 characters",
        }),
    slug: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9-]+$/)
        .optional()
        .messages({
            "string.pattern.base":
                "Slug can only contain lowercase letters, numbers and hyphens",
        }),
    description: Joi.string()
        .min(10)
        .required()
        .messages({
            "any.required": "Description is required.",
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
        }),

    banner: Joi.object({
        url: Joi.string()
            .uri()
            .required()
            .messages({
                "any.required": "Banner URL is required.",
                "string.empty": "Banner URL is required",
                "string.uri": "Banner URL must be a valid URL",
            }),

        filename: Joi.string()
            .trim().required()
            .messages({
                "any.required": "Banner filename is required.",
                "string.empty": "Banner filename is required",
            }),
    }).required().messages({ "any.required": "Banner is required." }),
    category: Joi.array()
        .items(
            Joi.string().custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("any.invalid");
                }
                return value;
            })
        ).min(1)
        .messages({
            "any.invalid": "Invalid Category ID",
            "array.min": "Select at least 1 category."
        }),
    language: Joi.string()
        .min(2)
        .max(50)
        .optional(),
    duration: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "Duration must be a number",
            "number.positive": "Duration must be positive",
        }),
    status: Joi.string()
        .valid("active", "inactive", "cancelled")
        .optional(),
});

export const venueSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "any.required": "Venue name is required",
            "string.min": "Venue name must be at least 2 characters",
            "string.max": "Venue name cannot exceed 100 characters",
        }),
    city: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "any.required": "City is required",
            "string.min": "City must be at least 2 characters",
        }),
    address: Joi.string()
        .trim()
        .min(5)
        .max(300)
        .required()
        .messages({
            "any.required": "Address is required",
            "string.min": "Address must be at least 5 characters",
        }),
    capacity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "any.required": "Capacity is required.",
            "number.base": "Capacity must be a number",
            "number.positive": "Capacity must be greater than 0",
        }),
    sections: Joi.array()
        .items(
            Joi.object({
                name: Joi.string()
                    .trim()
                    .min(1)
                    .max(50)
                    .required()
                    .messages({
                        "any.required": "Section name is required",
                    }),
                totalSeats: Joi.number()
                    .integer()
                    .positive()
                    .required()
                    .messages({
                        "any.required": "Total seats can't be empty.",
                        "number.base": "Total seats must be a number",
                        "number.positive": "Total seats must be greater than 0",
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            "any.required": "At least one section is required",
            "array.min": "At least one section is required",
        }),
    seatLayout: Joi.array()
        .items(
            Joi.object({
                section: Joi.string()
                    .trim()
                    .required()
                    .messages({
                        "any.required": "Section is required in seat layout",
                        "string.empty": "Section is required in seat layout",
                    }),
                row: Joi.string()
                    .trim()
                    .required()
                    .messages({
                        "any.required": "Row is required in seat layout",
                        "string.empty": "Row is required in seat layout",
                    }),
                seatNumber: Joi.string()
                    .trim()
                    .required()
                    .messages({
                        "any.required": "Seat number is required",
                        "string.empty": "Seat number is required",
                    }),
            })
        )
        .optional(),
    status: Joi.string()
        .valid("active", "inactive")
        .optional()
        .messages({
            "any.only": "Status must be either active or inactive",
        }),
});

export const categorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required().messages({ "*": "Category name must be 2 to 100 character long." }),
    description: Joi.string()
        .trim()
        .min(5)
        .max(500)
        .required().messages({
            "any.required": "Description is required.",
            "string.min": "Description must contain at least 5 characters.",
            "string.max": "Description must contain at most 500 characters."
        }),
    icon: Joi.object({
        url: Joi.string()
            .uri()
            .required()
            .messages({
                "any.required": "Icon URL is required.",
                "string.empty": "Icon URL is required",
                "string.uri": "Icon URL must be a valid URL",
            }),
        filename: Joi.string()
            .trim().required().messages({
                "any.required": "Icon filename is required."
            }),
    }).required().messages({ "*": "Icon is required." })
});