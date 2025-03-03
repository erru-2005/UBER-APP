const usermodel = require("../models/user.model")
const {validationResult} = require("express-validator")
const userservice = require("../Services/user.service")
const BlacklistedToken = require("../models/BacklistedToken.model")

module.exports.registerUser=async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({error: error.array()});
    }
    try
    {
    const {fullname,email,password}=req.body
    const hashPassword = await usermodel.hashPassword(password);


    const user = await userservice.createUser({
        firstname :fullname.firstname,
        lastname :fullname.lastname,
        email,
        password:hashPassword
    });

    const token = user.generateAuthToken()
    return res.status(201).json({token,user})
}
catch(err)
{
    return res.status(500).json({error: err.message});
}   
}


module.exports.loginUser=async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({error: error.array()});
    }

    const {email,password}=req.body
    try
    {  
        const user = await usermodel.findOne({ email}).select("+password"); 
        if(!user)
        {
            return res.status(401).json({message: "Invalid Email or Password"});
        }
        const isValid = await user.comparePassword(password);
        if(!isValid)
        {
            return res.status(401).json({message: "Invalid Email or Password"});
        }
        const token = user.generateAuthToken();
        res.cookie("token",token,{httpOnly:true});

        return res.status(200).json({token,user});
        


    }
    catch(err)
    {
        return res.status(500).json({error: err.message});
    }



}


module.exports.getUserProfile=async(req,res,next)=>{

return res.status(200).json({user: req.user});
}


module.exports.logOutUser=async(req,res)=>{
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    await BlacklistedToken.create({token});
    res.status(201).json({message:'Logged out'})

}
