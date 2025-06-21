const rideModel = require('../models/createRide.model');
const captainModel = require('../models/captain.model');
const { getDistanceTime } = require('./maps.services');
const crypto = require('crypto');


const calculateFare = async (pickup, dropoff) => {
    try {
        const distanceTime = await getDistanceTime(pickup, dropoff);
        if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
            throw new Error('Could not calculate distance and time.');
        }

        const distance = distanceTime.distance.value; // in meters
        const duration = distanceTime.duration.value; // in seconds
        if (distance <= 0 || duration <= 0) {
            throw new Error('Invalid distance or duration.');
        }
        // Define base fares and rates
        const baseFareBike = 5;
        const baseFareAuto = 7;
        const baseFareCar = 9;

        const ratePerKilometerBike = 10;
        const ratePerKilometerAuto = 15;
        const ratePerKilometerCar = 20;

        const ratePerMinuteBike = 2;
        const ratePerMinuteAuto = 2.5;
        const ratePerMinuteCar = 3;

        // Calculate fares
        const fareBike = baseFareBike + (distance / 1000) * ratePerKilometerBike + (duration / 60) * ratePerMinuteBike;
        const fareAuto = baseFareAuto + (distance / 1000) * ratePerKilometerAuto + (duration / 60) * ratePerMinuteAuto;
        const fareCar = baseFareCar + (distance / 1000) * ratePerKilometerCar + (duration / 60) * ratePerMinuteCar;

        // Return fares
        return {
            bike: Math.round(fareBike),
            auto: Math.round(fareAuto),
            car: Math.round(fareCar)
        };

       
    } catch (error) {
        throw new Error('Error fetching fare: ' + error.message);
    }
}


 // otp generator
 function optGenerator(num) {
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num));
    return otp;
}



module.exports.createRide = async (userId, pickup, dropoff, vahicleType) => {

   
   
    try {
        
        if (pickup === dropoff) {
            throw new Error('Pickup and dropoff locations cannot be the same.');
        }
        const distanceTime = await getDistanceTime(pickup, dropoff);
      
        if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
            throw new Error('Could not calculate distance and time.');
        }

        const distance = distanceTime.distance; // in meters
        const duration = distanceTime.duration; // in seconds
        const fareDetails = await calculateFare(pickup, dropoff);
        if (!fareDetails) {
            throw new Error('Could not calculate fare.');
        }
        let fare = 0;
        if (vahicleType === 'bike') {
            fare =fareDetails.bike;
        } else if (vahicleType === 'auto') {
            fare = fareDetails.auto;
        } else if (vahicleType === 'car') {
            fare = fareDetails.car;
        } else {
            throw new Error('Invalid vehicle type.');
        }
        

        const ride = new rideModel({
            userId: userId,
            pickup: pickup,
            dropoff: dropoff,
            fare: fare,
            vehicleType: vahicleType,
            distance: distance.text,
            duration: duration.text,
            otp: optGenerator(6),
        });
        await ride.save();
        return ride;
    } catch (error) {
        throw new Error('Error creating ride: ' + error.message);
    }
}


module.exports.getFare = async (pickup, dropoff) => {
    try {
        if (!pickup || !dropoff) {
            throw new Error('Pickup and dropoff locations are required.');
        }
        const fareDetails = await calculateFare(pickup, dropoff);
        return fareDetails;
    } catch (error) {
        throw new Error('Error fetching fare: ' + error.message);
    }
}

module.exports.confirmRideData = async (rideId,captainId) =>{

    try {
        // 1. Update the ride with the captainId
        await rideModel.findByIdAndUpdate(rideId, {
            captainId: captainId,
            status: 'accepted'
        });
    
        // 2. Retrieve the updated ride with populated userId and captainId
        const acceptedRide = await rideModel
            .findById(rideId)
            .populate('userId') // Assuming you want full user info
            .populate('captainId') // Optional: if captainId is a ref to another model
            .select('+otp'); // Include hidden field "otp" if it has select: false in schema
    
        
        return acceptedRide;
    
    } catch (e) {
        console.error("Error in confirm ride:", e);
    }
    


}

module.exports.startRideService = async (rideId, otp) => {
    try {
        // Find the ride and check OTP
        const ride = await rideModel.findById(rideId).select('+otp');
        
        if (!ride) {
            throw new Error('Ride not found');
        }
        
        if (ride.otp != otp) {
            throw new Error('Invalid OTP');
        }

        // Update ride status to ongoing
        const updatedRide = await rideModel.findByIdAndUpdate(
            rideId,
            { status: 'ongoing' },
            { new: true }
        )
        .populate('userId')
        .populate('captainId')
        .select('+otp');

        return updatedRide;
    } catch (error) {
        throw new Error('Error checking OTP: ' + error.message);
    }
}





module.exports.endRide = async (rideid, captainId) => {
    try {
        if (!rideid || !captainId) {
            throw new Error("rideId and CaptainId is required");
        }
        // check the caoptain is authorized to end the ride
        // find the ride by rideid and captainId
        const res = await rideModel.findOne({
            _id: rideid,
            captainId: captainId
        })
        .populate('userId')
        .populate('captainId');

        if (!res) {
            throw new Error("Ride not found or you are not authorized to end this ride");
        }

        res.status = "completed";
        await res.save(); // updating the status to completed
        return res;
    } catch (err) {
        console.log("Error in the endRide", err.message);
        throw err;
    }
};