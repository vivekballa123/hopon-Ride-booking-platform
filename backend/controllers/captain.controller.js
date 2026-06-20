import CaptainModel from "../models/captain.model.js";
import captainService from "../services/captain.services.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";

export default {
    registerCaptain: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const isCaptainExist = await CaptainModel.findOne({ email });

        if (isCaptainExist) {
            return res.status(400).json({ message: "Captain with this email already exists" });
        }

        const hashedPassword = await CaptainModel.hashPassword(password);
         
        const captain = await captainService.createCaptain(
            fullname.firstname,
            fullname.lastname,
            email,
            hashedPassword,
            vehicle.capacity,
            vehicle.vehicleType,
            vehicle.plate,
            vehicle.color
        );
        const token = captain.generateAuthToken();


        res.status(201).json({ message: "Captain registered successfully", captain, token });
    },
    loginCaptain: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await CaptainModel.findOne({ email }).select("+password");
         
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

         

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password...." });
        }
        console.log(isMatch)
        
        const token = captain.generateAuthToken();

        res.cookie("token", token)

        res.status(200).json({ message: "Login successful", captain, token });
    },
    getCaptainProfile: async (req, res, next) => {
        const captainId = req.captain._id;
        const captain = await CaptainModel.findById(captainId).select("-password");
        res.status(200).json({ captain });
    },
    logoutCaptain: async (req, res) => {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            await BlacklistToken.create({ token });
        }
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    }
};