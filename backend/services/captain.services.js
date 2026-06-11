import captainModel from "../models/captain.model.js";

export default {
    createCaptain: async (firstname,lastname, email, password,capacity, vehicleType,plate,color) => {
        if (!email || !password || !firstname || !vehicleType || !color || !plate || !capacity) { 
            throw new Error('All fields are required')
        }
        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                capacity,
                vehicleType,
                color,
                plate
            }
        })
        return captain;
    }}