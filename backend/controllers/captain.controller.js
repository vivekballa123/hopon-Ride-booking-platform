import CaptainModel from "../models/captain.model.js";
import captainService from "../services/captain.services.js";
import { validationResult } from "express-validator";

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
    }
};