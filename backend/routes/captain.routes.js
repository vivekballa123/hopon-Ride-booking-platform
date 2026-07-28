import express from "express";
import {body} from "express-validator";
import captainController from "../controllers/captain.controller.js";
import authCaptainMiddleware from "../middleware/auth.CaptainMiddleware.js";


const router = express.Router();


router.post("/register",[
    body("fullname.firstname").isLength({min:3}).withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"), 
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Vehicle color is required"),
    body("vehicle.plate").isLength({min:3}).withMessage("Vehicle plate is required"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(['car', 'moto', 'auto']).withMessage("Vehicle type must be one of car, motorcycle, auto, scooter")    

],captainController.registerCaptain
)

router.post("/login",[
    body("email").isEmail().withMessage("Valid email is required"), 
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],captainController.loginCaptain)


router.get("/profile", authCaptainMiddleware, captainController.getCaptainProfile)

router.get("/logout", authCaptainMiddleware, captainController.logoutCaptain)

export default router;