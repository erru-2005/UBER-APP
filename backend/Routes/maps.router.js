const express =require('express');
const mapControler = require('../controllers/map.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { query } = require('express-validator');
const router = express.Router();

router.get('/coordinates',query('address').isString().isLength({min:3}),authMiddleware.authUser, mapControler.getCoordinates);
router.get('/get-suggection',authMiddleware.authUser,mapControler.getSuggection);
router.get('/get-distance-time',query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),authMiddleware.authUser,mapControler.getDistanceTime)
module.exports = router;