const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt') 
require('dotenv').config(); 

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name should be not less then 3 charater"],
        },
        lastname: {
            type: String,
            minlength: [3, "lastname should be not less then 3 charater"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email should be not less then 5 charater"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: [10, "Phone number should be not less than 10 characters"],
    },
    socketid: {
        type: String,
    },
    status:{
        type: String,
        enum :['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color should be not less then 3 charater"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate should be not less then 3 charater"]
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"capacity should be not less then 1 charater"]
        },
        vehicleType:{
            type:String,
            required: true,
            enum: ['car','bike','auto']
        }
    },
    location: {
        type: { type: String, enum: ['Point'], required: true, default: 'Point' },
        coordinates: { type: [Number], required: true }, // [lng, lat]
      }
    });

    captainSchema.methods.generateAuthToken = function () {
        const token = jwt.sign({_id: this._id}, process.env.JWT_Secret, { expiresIn: '2d' })
        return token;
    }
    captainSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);   
    }
    captainSchema.statics.hashPassword = async function (password) { 
        return await bcrypt.hash(password, 10);
    }
    
    const captainModel=mongoose.model('captain',captainSchema);

    module.exports = captainModel;





