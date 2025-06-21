const captainModel = require('../models/captain.model');

module.exports.registerCaptain = async ({ firstname, lastname, email, password, phoneNumber, color, plate, capacity, vehicleType }) => {
    if (!firstname || !email || !password || !phoneNumber || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    try {
        const hashedPassword = await captainModel.hashPassword(password);
        const newCaptain = captainModel.create({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
            phoneNumber,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        return newCaptain;
    } catch (err) {
        throw err;
    }
};

