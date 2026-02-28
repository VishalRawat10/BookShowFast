import { OAuth2Client } from "google-auth-library";
import { getEnv } from "../utils/env.utils.js";
import ExpressError from "../utils/ExpressError.js";

const client = new OAuth2Client(getEnv("GOOGLE_CLIENT_ID"));

export const verifyIdToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // must match
        });

        const payload = ticket.getPayload(); return payload;
    } catch (err) {
        throw new ExpressError(401, err.message);
    }
};