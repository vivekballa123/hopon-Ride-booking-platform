import axios from 'axios';
import dotenv from 'dotenv';
import captainModel from '../models/captain.model.js';
 

dotenv.config();

// Function to convert address to coordinates using Google Maps Geocoding API
const getAddressCoordinate = async (address) => {
    try {
        // Validate address input
        if (!address || address.trim() === '') {
            throw new Error('Address is required');
        }

        // Get API key from environment variables
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error('Google Maps API key is not configured');
        }

        // Call Google Maps Geocoding API
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: apiKey
            }
        });

        // Check if request was successful
        if (response.data.status !== 'OK') {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }

        // Extract coordinates from response
        if (response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;

            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('No results found for the given address');
        }

    } catch (error) {
        console.log(process.env.GOOGLE_MAPS_API_KEY);
        console.error('Error fetching coordinates:', error.message);
        
        throw new Error(`Failed to get coordinates...... for address: ${error.message}`);
    }
};
const getDistanceAndTime = async (origin, destination) => {
    try {
        // Validate input
        if (!origin || !destination) {
            throw new Error('Origin and destination are required');
        }

        // Get API key from environment variables
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error('Google Maps API key is not configured');
        }

        // Call Google Maps Distance Matrix API
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey
            }
        });

        // Check if request was successful
        if (response.data.status !== 'OK') {
            throw new Error(`Distance matrix error: ${response.data.status}`);
        }

        // Extract distance and time from response
        if (response.data.rows && response.data.rows.length > 0 && response.data.rows[0].elements && response.data.rows[0].elements.length > 0) {
            const element = response.data.rows[0].elements[0];
            return {
                distance: element.distance.value,      // meters
                duration: element.duration.value,      // seconds
                distanceText: element.distance.text,
                durationText: element.duration.text
            };
        } else {
            throw new Error('No results found for the given origin and destination');
        }

    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw new Error(`Failed to get distance and time for origin: ${origin} and destination: ${destination}`);
    }
};

const getSuggestions = async (input) => {
    try {
        // Validate input
        if (!input || input.trim() === '') {
            throw new Error('Input is required');
        }

        // Get API key from environment variables
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error('Google Maps API key is not configured');
        }

        // Call Google Maps Places API for suggestions
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: apiKey
            }
        });

        // Check if request was successful
        if (response.data.status !== 'OK') {
            throw new Error(`Places error: ${response.data.status}`);
        }

        // Extract suggestions from response
        if (response.data.predictions && response.data.predictions.length > 0) {
            return response.data.predictions;
        } else {
            throw new Error('No suggestions found for the given input');
        }

    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        throw new Error(`Failed to get suggestions for input: ${error.message}`);
    }
};

const getCaptainsInRadius = async (latitude, longitude, radius) => {
    
    
    
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radius / 6378137]
            }
        }
    });

    return captains;
};

export default {
    getAddressCoordinate,
    getDistanceAndTime,
    getSuggestions,
    getCaptainsInRadius
};
