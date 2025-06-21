// Initialize express router
const { validationResult } = require('express-validator');
const registerCaptainService = require('../Services/captain.service');
const blackListedTokenModel = require("../models/BacklistedToken.model");
const captainModel = require('../models/captain.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, phoneNumber, vehicle } = req.body;
    try {
        const captainExist = await captainModel.findOne({ email });
        if (captainExist) {
            return res.status(400).json({ message: "Captain already exists" });
        }
        const captain = await registerCaptainService.registerCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password,
            phoneNumber,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
        res.status(201).json({ captain, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    if(!email || !password){
        return res.stutus(400).json({message:"All fields are required"});
    }
    try {
        const captain = await captainModel
            .findOne({ email })
            .select("+password")
            .exec();
        if (!captain) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ token, captain });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
   
    await blackListedTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
     } catch (err) {
        return res.status(500).json({ message: "Error retrieving token" });
    }
};



