import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Full name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Full name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password by default
        minlength: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'offline'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Vehicle plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Vehicle capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto', 'scooter'],
        }

    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0],
        },
    }
});
captainSchema.index({ location: "2dsphere" });
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
captainSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const captainModel = mongoose.model('Captain', captainSchema);

export default captainModel;