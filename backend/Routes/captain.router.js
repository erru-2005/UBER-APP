const express = require('express');
const route = express.Router();
const { body,  } = require('express-validator');
const captainController=require('../Controllers/captain.controller')
const authMiddleWare = require('../middlewares/auth.middleware')

route.post('/register', [
    body('fullname.firstname')
        .isLength({ min: 3 }).withMessage('First name should be not less then 3 charater'),
    body('fullname.lastname')
        .optional()
        .isLength({ min: 3 }).withMessage('lastname should be not less then 3 charater'),
    body('phoneNumber')
        .isLength({ min: 10 }).withMessage('Phone number should be not less then 10 characters'),
    body('email')
        .isEmail().withMessage('invalid email')
        .isLength({ min: 5 }).withMessage('email should be not less then 5 charater'),
    body('password')
        .notEmpty().withMessage('password is required'),
    body('vehicle.color')
        .isLength({ min: 3 }).withMessage('color should be not less then 3 charater'),
    body('vehicle.plate')
        .isLength({ min: 3 }).withMessage('plate should be not less then 3 charater'),
    body('vehicle.capacity')
        .isNumeric().withMessage('capacity must be a number')
        .custom(value => value >= 1).withMessage('capacity should be not less then 1'),
    body('vehicle.vehicleType')
        .isIn(['car', 'bike', 'auto']).withMessage('vahicletype must be one of car, bike, auto'),   
],captainController.registerCaptain);

route.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('password is required')
],captainController.loginCaptain);

route.get('/profile',authMiddleWare.authCaptain,captainController.getCaptainProfile)

route.get('/logout',authMiddleWare.authCaptain,captainController.logoutCaptain)

module.exports = route;