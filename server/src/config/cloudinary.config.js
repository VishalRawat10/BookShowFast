import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getEnv } from "../utils/env.utils.js";

cloudinary.config({
    cloud_name: getEnv("CLOUD_NAME"),
    api_key: getEnv("CLOUD_API_KEY"),
    api_secret: getEnv("CLOUD_API_SECRET"),
    secure: true
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "BookShowFast/uploads/",
        resourse_type: 'auto',
    }
});

export default cloudinary;