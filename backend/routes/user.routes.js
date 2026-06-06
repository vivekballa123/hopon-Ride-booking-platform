import express from "express";
import {body} from "express-validator";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),  
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.registerUser)
export default router;