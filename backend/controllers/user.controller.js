import userModel from "../models/user.model.js";
import userService from "../services/user.services.js";
import { validationResult } from "express-validator"

export default {
    registerUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
   
        const { fullname, email, password } = req.body;

        const user = await userService.createUser(
            fullname.firstname,
            fullname.lastname,
            email,
            password
        );

        const token = user.generateAuthToken();
        res.status(201).json({ user, token })
    }
}