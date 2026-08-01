import rideService from '../services/ride.service.js';
import { validationResult } from 'express-validator';
import mapsService from '../services/maps.service.js';
import captainModel from '../models/captain.model.js';
import {
    sendMessageToSocketId,
    sendMessageToUser
} from '../socket.js';
import rideModel from '../models/ride.model.js';

const createRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {

        // Create Ride
        const ride = await rideService.createRide({
            pickup,
            destination,
            user: req.user._id,
            vehicleType
        });

        // Get pickup coordinates
        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);

        console.log("Pickup Coordinates:", pickupCoordinates);

        // Get distance & duration
        const distanceTime = await mapsService.getDistanceAndTime(
            pickup,
            destination
        );

        console.log("Distance Time:", distanceTime);

        // Find nearby captains
        const captainsInRadius = await mapsService.getCaptainsInRadius(
            pickupCoordinates.ltd, // change to .lat if your service returns lat
            pickupCoordinates.lng,
            2000
        );

        // Hide OTP
        ride.otp = "";

        // Populate user details
        const rideWithUser = await rideModel
            .findById(ride._id)
            .populate("user");

        console.log("RIDE VEHICLE TYPE:", rideWithUser.vehicleType);
        console.log("CAPTAINS FOUND:", captainsInRadius.length);

        captainsInRadius.forEach((captain) => {

            console.log("----------------------");
            console.log("Captain ID:", captain._id);
            console.log("Captain vehicle:", captain.vehicle?.vehicleType);
            console.log("Ride vehicle:", rideWithUser.vehicleType);
            console.log("Socket ID:", captain.socketId);

            const isVehicleMatch =
                captain.vehicle?.vehicleType === rideWithUser.vehicleType;

            console.log("MATCH:", isVehicleMatch);

            if (isVehicleMatch && captain.socketId) {

                console.log(
                    "✅ Sending ride to matching captain:",
                    captain.socketId
                );

                sendMessageToSocketId(captain.socketId, {
                    event: "new-ride",
                    data: {
                        ...rideWithUser.toObject(),
                        distance: distanceTime.distance,
                        duration: distanceTime.duration,
                        distanceText: distanceTime.distanceText,
                        durationText: distanceTime.durationText
                    }
                });
            }
        });

        return res.status(201).json({
            ride,
            vehicleType
        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            error: error.message
        });

    }
};

const getFare = async (req, res) => {

    const { pickup, destination } = req.query;

    try {

        const fare = await rideService.getFare(
            pickup,
            destination
        );

        return res.status(200).json(fare);

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            error: error.message
        });

    }

};
const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToUser(ride.user._id.toString(), {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToUser(ride.user._id.toString(), {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({
            rideId,
            captain: req.captain
        });

        console.log("Ride completed:", ride._id);
        console.log("Sending ride-ended to user:", ride.user?._id);

        sendMessageToUser(ride.user._id.toString(), {
            event: "ride-ended",
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
export default {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
};