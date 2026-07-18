import userModel from "../models/user.model.js";
import userService from "../services/user.services.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";

export default {
    registerUser: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "User with this email already exists" });
        }   

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser(
            fullname.firstname,
            fullname.lastname,
            email,
            hashedPassword
        );

        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    },

    loginUser: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

 

    const isMatch = await user.comparePassword(password);


        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.cookie("token", token)

        res.status(200).json({ token, user });
    },
    getUserProfile: async (req, res) => {
        const userId = req.user._id;
        const user = await userModel.findById(userId).select("-password");
        res.status(200).json(user);
    },
    logoutUser: async (req, res) => {
        res.clearCookie("token");
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        await BlacklistToken.create({ token });
        res.status(200).json({ message: "Logged out successfully" });
    }   

};