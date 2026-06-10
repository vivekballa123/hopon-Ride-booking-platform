import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
     
     
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const isBlacklisted = await userModel.findOne({ token:token });
    if (isBlacklisted) {
        return res.status(401).json({ error: "Token has been blacklisted. Please log in again." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
}

export default authMiddleware