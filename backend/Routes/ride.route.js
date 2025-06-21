const express = require('express')
const router = express.Router();
const rideController = require('../Controllers/ride.controller')
const {body,query} = require('express-validator')
const authMiddleware =require('../middlewares/auth.middleware')

router.post('/create-ride',
    authMiddleware.authUser,
    [
    body('pickUp').isString().isLength({min:3}).withMessage('pickup must be a string'),  
    body('dropoff').isString().isLength({min:3}).withMessage('dropoff must be a string'),
    body('vahicleType').isString().isLength({min:3}).withMessage('vahicleType must be a string')
    .isIn(['bike', 'auto', 'car']).withMessage('vahicleType must be either bike, auto, or car')],
   
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    [
        query('pickUp').isString().isLength({min:3}).withMessage('pickup must be a string'),  
        query('dropoff').isString().isLength({min:3}).withMessage('dropoff must be a string'),
    ],
    rideController.getFare
)


router.post('/confirm',
    authMiddleware.authCaptain,
    [
        body('rideId')
          .isString()
          .isLength({ min: 3 })
          .withMessage('rideId must be a string with at least 3 characters'),
      
        body('captainId')
          .isString()
          .isLength({ min: 3 })
          .withMessage('captainId must be a string with at least 3 characters')
      ],
      rideController.rideAccept
)


router.get('/start-ride',
    authMiddleware.authCaptain,
[
  query('rideId')
    .isString()
    .isLength({ min: 3 })
    .withMessage('rideId must be a string with at least 3 characters'),

  query('otp')
    .isNumeric()
    .isLength({ min: 6, max: 6 })
    .withMessage('otp must be exactly 6 characters'),
],
rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
[
  body('rideId')
    .isString()
    .isLength({ min: 3 })
    .withMessage('rideId must be a string with at least 3 characters')
],
rideController.endRide
)

module.exports = router
