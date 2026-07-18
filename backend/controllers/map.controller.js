import mapServise from "../services/maps.service.js"
import  { validationResult } from "express-validator";



const getCoordinates = async (req,res,next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {address} = req.query;
    try {
        const coordinates = await mapServise.getAddressCoordinate(address);
        console.log("Address:", address);
        console.log("Coordinates:", coordinates);
        res.status(200).json(coordinates)

    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        console.log(error.message);
        res.status(404).json({message:'Coordinatesssss not found', error:error.message})
        
    }
}

const getDistanceAndTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    try {
        const distanceAndTime = await mapServise.getDistanceAndTime(origin, destination);
        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.log(error.response?.data);
        console.error(error.message);

        throw new Error(error.response?.data?.error_message || error.message);    }
};

const getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    try {
        const suggestions = await mapServise.getSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        res.status(404).json({ message: 'Suggestions not found', error: error.message });
    }
};

export default {
    getCoordinates,
    getDistanceAndTime,
    getSuggestions
};