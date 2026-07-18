import express from "express";
import authUserMiddleware from "../middleware/auth.UserMiddleware.js";
import mapController from "../controllers/map.controller.js";
import { query } from "express-validator";


const router = express.Router();

router.get(
    "/get-coordinates",
    query("address")
        .isString()
        .notEmpty()
        .isLength({ min: 2, max: 100 })
        .withMessage("Address must be between 2 and 100 characters"),
    authUserMiddleware,
    mapController.getCoordinates
);

router.get("/get-distance-time",
    query("origin")
        .isString()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Origin must be between 2 and 100 characters"),
    query("destination")
        .isString()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Destination must be between 2 and 100 characters"),
    authUserMiddleware,
    mapController.getDistanceAndTime
);

router.get("/get-suggestions",
    query("input").isString().notEmpty().isLength({ min: 2 }).withMessage("Input must be between 2 and 100 characters"),
    authUserMiddleware,
    mapController.getSuggestions
);

export default router;