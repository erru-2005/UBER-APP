const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("fistname should be more than 3 character"),
    body('password').isLength({min:6}).withMessage("password should be atleast of 6 long")

] ,userController.registerUser);

router.post('/login',
[
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min:6}).withMessage("password should be atleast of 6 long")
],
 userController.loginUser); 

 router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

 router.get('/logout',authMiddleware.authUser,userController.logOutUser)


module.exports = router;