import express from "express";
import {body} from "express-validator";
import userController from "../controllers/user.controller.js";
import authUserMiddleware from "../middleware/auth.UserMiddleware.js";

const router = express.Router();

router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),  
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.registerUser)


router.post("/login",[
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser)


router.get("/profile", authUserMiddleware, userController.getUserProfile)

router.get("/logout",authUserMiddleware,userController.logoutUser)

export default router;