import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import { initializeSocket } from "./socket.js";

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://hopon-frontend.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
await initializeSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});