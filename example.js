import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

// --- Redis Setup ---
const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Error:", err));

await redisClient.connect();

// --- Routes ---

// 1. SET value
app.post("/set", async (req, res) => {
    const { key, value } = req.body;

    await redisClient.set(key, value);
    res.json({ message: "Value saved" });
});

// 2. GET value
app.get("/get/:key", async (req, res) => {
    const key = req.params.key;

    const value = await redisClient.get(key);
    res.json({ key, value });
});

// --- Start Server ---
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
