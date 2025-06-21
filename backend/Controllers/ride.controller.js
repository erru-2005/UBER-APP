const rideService = require('../Services/ride.service');
const { validationResult } = require('express-validator');
const { getCaptainInTheRadius  } = require('../Services/maps.services');
const { getMapData } = require('../Services/maps.services');
const {sendMessageById } = require('../socket')
const rideModel = require("../models/createRide.model")


module.exports.createRide = async (req, res) => {

    try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { pickUp, dropoff, vahicleType } = req.body;
        const ride = await rideService.createRide(req.user._id, pickUp, dropoff, vahicleType);
        
        const pickUpCoordinates = await getMapData(pickUp)
        
        const captains = await getCaptainInTheRadius(pickUpCoordinates.lat,pickUpCoordinates.lng,400)
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate("userId").select('-otp');
       
        captains.map((captain) => {
           
            sendMessageById(captain.socketid, {
                event: "sendRide",
                data: rideWithUser
            });
        });
       
       
        return res.status(200).json({ ride });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports.getFare = async (req, res) => {

   
    const {pickUp,dropoff}= req.query
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const fare = await rideService.getFare(pickUp, dropoff);
       
       
       

        return res.status(200).json({ fare });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });

    }

}

module.exports.rideAccept = async (req,res)=>{

    try{
    const { rideId, captainId } = req.body;

    const acceptedRide = await rideService.confirmRideData(rideId,captainId)
   
    
    if(acceptedRide){
        sendMessageById(acceptedRide?.userId.socketid,{
            event : "Accepted-ride",
            data : acceptedRide
        })
    }
    return res.status(200).json({acceptedRide })
    }catch(err){

        return res.status(500).json({ errorOnRideController: err.message }); 
    }
}

module.exports.startRide = async (req,res)=>{
    const {rideId,otp}= req.query
    
    try{
        if(!rideId || !otp){
             return res.status(404).json({Error:"Require rideId and otp"})
        }

        const resp = await rideService.startRideService(rideId,otp)
       
        sendMessageById(resp.userId.socketid,{
            event : "start-ride",
            data: resp
        })

       return res.status(200).json({resp})
    }catch(e){
        console.log("error in startRide",e)
    }
}


module.exports.endRide = async (req,res)=>{
    const {rideId}= req.body
    
    try{
        if(!rideId){
             return res.status(404).json({Error:"Require rideId"})
        }
        
        const resp = await rideService.endRide(rideId, req.captain._id)

        sendMessageById(resp.userId.socketid,{
            event : "end-ride",
            data: resp
        })

       return res.status(200).json({resp})
    }catch(e){
        console.log("error in endRide",e.message)
    }
}   
