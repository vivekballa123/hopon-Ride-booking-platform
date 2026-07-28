import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let ioInstance = null;

export function initializeSocket(server) {

    if (ioInstance) return ioInstance;

    ioInstance = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "https://hopon-backend-63qr.onrender.com"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    console.log("Socket.IO initialized");

    ioInstance.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User ${userId} of type ${userType} joined with socket ID: ${socket.id}`);
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                socket.join(`user_${userId}`);
            }
            if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                socket.join(`captain_${userId}`);
            }
        });
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) {
                console.error('Invalid location data received');
                return;
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [location.lng, location.ltd]
                }
            });
        });
        socket.on("disconnect", () => {
            console.log("Client Disconnected:", socket.id);
        });

    });

    return ioInstance;
}

export function getIO() {
    return ioInstance;
}

export function sendMessageToSocketId(socketId, messageObject = {}) {

    console.log("Sending message to socket ID:", socketId, messageObject);

    if (!ioInstance) return false;

    ioInstance.to(socketId).emit(messageObject.event, messageObject.data);

    return true;
}
export function sendMessageToUser(userId, messageObject = {}) {
    if (!ioInstance) {
        console.error("Socket.IO is not initialized");
        return false;
    }

    if (!userId) {
        console.error("Cannot send message: userId missing");
        return false;
    }

    const room = `user_${userId}`;

    console.log(
        `Sending ${messageObject.event} to ${room}`,
        messageObject.data
    );

    ioInstance
        .to(room)
        .emit(messageObject.event, messageObject.data);

    return true;
}