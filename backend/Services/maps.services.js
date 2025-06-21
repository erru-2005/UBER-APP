const axios = require('axios');
const captainModel = require('../models/captain.model');
require('dotenv').config();
module.exports.getMapData = async (userAddress) => {
    try {
        const address = encodeURIComponent(userAddress); 
        const apiKey = process.env.GOOGLE_MAP_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

        const response = await axios.get(url);
        const { results } = response.data;
       
        if (results.length > 0 && response.data.status === 'OK' ) {
            const { geometry } = results[0];
            const { location } = geometry;
            const { lat, lng } = location;
            return { 
                lat, 
                lng     
            };
        } else {
            throw new Error("Unable to fetch the Co-Ordinates.");
        }
    } catch (error) {
        console.error("Error while getting map data:", error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    try {
        const apiKey = process.env.GOOGLE_MAP_API_KEY;

        const encodedOrigin = encodeURIComponent(origin);
        const encodedDestination = encodeURIComponent(destination);

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

        const response = await axios.get(url);
        const { rows } = response.data;
        // Check if rows exist and if the status is OK
        if (rows.length > 0 && response.data.status === 'OK') {
            const { elements } = rows[0];
            if (elements.length > 0) {
                const { distance, duration } = elements[0];
               
                return { 
                    distance: distance, 
                    duration: duration 
                };
            } else {
                throw new Error("Unable to fetch the Distance and Time.");
            }
        } else {
            throw new Error("Unable to fetch the Distance and Time.");
        }
    } catch (err) {
        console.error("Error while getting distance and time:", err);
        throw err; // Better to throw so that caller knows it failed
    }
}

module.exports.getSuggection = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAP_API_KEY;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedAddress}&key=${apiKey}`;

        const response = await axios.get(url);
        const { predictions } = response.data;
        
        if (predictions.length > 0) {
            return predictions.map(prediction => prediction.description);
        } else {
            console.log("No suggestions found.");
        }
    } catch (error) {
        console.error("Error while getting suggestions:", error);
        
    }
}

module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
    try {
       
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius / 6378.1] // [lng, lat], radius in radians
                }
            }
        });
        return captains;
    } catch (error) {
        console.error("Error while getting captains in the radius:", error);
        throw error;
    }
}
