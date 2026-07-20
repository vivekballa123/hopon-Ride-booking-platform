import express from "express";
import { body, query } from "express-validator";
import rideController from "../controllers/ride.controller.js";
import authUserMiddleware from "../middleware/auth.UserMiddleware.js";
import authCaptainMiddleware from "../middleware/auth.CaptainMiddleware.js";

const router = express.Router();

router.post("/create",
    authUserMiddleware,

    body("pickup").isString().notEmpty().isLength({ min: 2 }).withMessage("Pickup location must be between 2 and 100 characters"),
    body("destination").isString().notEmpty().isLength({ min: 2 }).withMessage("Destination must be between 2 and 100 characters"),
    body("vehicleType").isIn(["auto", "car", "moto"]).withMessage("Vehicle type must be one of 'auto', 'car', or 'moto'"),
    rideController.createRide
);
router.get(
    "/get-fare",
    authUserMiddleware,
    query("pickup")
        .isString()
        .notEmpty()
        .isLength({ min: 2 }),
    query("destination")
        .isString()
        .notEmpty()
        .isLength({ min: 2 }),
    rideController.getFare
);

router.post('/confirm',
    authCaptainMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.post('/start-ride',
    authCaptainMiddleware,
    body("otp")
        .isString()
        .notEmpty()
        .isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
    body("rideId")
        .isMongoId()
        .withMessage("Invalid ride id"),
    rideController.startRide
)

router.post('/end-ride',
    authCaptainMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

export default router;