const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model');


module.exports.authUser = async(req,res,next) => {

const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
if(!token)
{
    return res.status(401).json({message: "Unauthorized"});
}

const isBacklistedToken= await usermodel.findOne({token:token})
if(isBacklistedToken)
    {
        res.status(401).json({message:"Unauthorized"})
    } 
try
{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await usermodel.findById(decoded._id);
    req.user = user;
    return next();
}
catch(err)
{
    return res.status(401).json({message: "Unauthorized",error:err.message});
}

}