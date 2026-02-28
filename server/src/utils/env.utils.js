import { config } from "dotenv";
config();

export const getEnv = (key) => {
    const val = process.env[key];
    if (val === undefined) {
        throw new Error(`Key : ${key} is not found in environment variable!`);
    }

    return val;
}