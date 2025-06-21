const mongoose = require('mongoose');



const rideSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true, 
    },
    captainId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    pickup:{
        type: String,
        required: true, 
    },
    dropoff:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now, 
    },
    fare:{
        type: Number,
        required: true, 
    },
    status:{
        type: String,
        enum: ['pending','ongoing','accepted', 'completed', 'cancelled'],
        default: 'pending', 
    }, 
    duration:{
        type: String,
        required: true, 
    },
    distance:{
        type: String,
        required: true, 
    }, 
    paymentId:{
        type: String 
    },
    orderId:{
        type: String 
    },
    signature:{
        type: String 
    },
    otp:{
        type: String,
        required: true, 
        select: false,
    },
})


module.exports = mongoose.model('Ride', rideSchema)