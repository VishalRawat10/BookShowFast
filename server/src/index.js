import { getEnv } from "./utils/env.utils.js";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.config.js";

const server = http.createServer(app);

const PORT = getEnv("PORT");

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on domain http://localhost:${PORT} ✅...`);
});