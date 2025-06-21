const mapService = require('../Services/maps.services.js');
const {validationResult}=require('express-validator')

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const address = req.query.address; // Assuming the address is passed as a query parameter
        if (!address) {
            return res.status(400).send({ message: 'Address is required' });
        }

        const coordinates = await mapService.getMapData(address);

        if (!coordinates) {
            return res.status(404).send({ message: 'Coordinates not found for the given address' });
        }

        res.status(200).send(coordinates);
    } catch (error) {
        console.error('Error getting coordinates:', error);
        res.status(500).send({ message: 'Failed to retrieve coordinates', error: error.message });
    }
};

module.exports.getDistanceTime = (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const origin = req.query.origin; // Assuming the origin is passed as a query parameter
        const destination = req.query.destination; // Assuming the destination is passed as a query parameter

        if (!origin || !destination) {
            return res.status(400).send({ message: 'Origin and destination are required' });
        }

        mapService.getDistanceTime(origin, destination)
            .then(distanceTime => {
                res.status(200).send(distanceTime);
            })
            .catch(error => {
                console.error('Error getting distance and time:', error);
                res.status(500).send({ message: 'Failed to retrieve distance and time', error: error.message });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

module.exports.getSuggection = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const address = req.query.address; // Assuming the address is passed as a query parameter
       
        if (!address) {
            return res.status(400).send({ message: 'Address is required' });
        }

       const suggection = await mapService.getSuggection(address);

        if (!suggection) {
            return res.status(404).send({ message: 'No suggestions found for the given address' });
        }

        res.status(200).send(suggection);
    } catch (error) {
        console.error('Error getting coordinates:', error);
        res.status(500).send({ message: 'Failed to retrieve coordinates', error: error.message });
    }
};

