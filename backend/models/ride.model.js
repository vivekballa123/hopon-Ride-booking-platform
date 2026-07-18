import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
         
    },
    fare: {
        type: Number,
        required: true
    },
    vehicleType: {
    type: String,
    enum: ["car", "moto", "auto"],
    required: true
},
    status: {
        type: String,
        enum: ['pending', 'accepted',"ongoing", 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
        required: true
         
    },
    distance: { 
        type: Number,
        required: true
         
    },
    paymentID: {
        type: String,
        default: null
    },
    orderId: {
        type: String,
        default: null
    },
    signature: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        select: false,
        required: true
    }   
}, { timestamps: true }
);

export default mongoose.model('Ride', rideSchema);