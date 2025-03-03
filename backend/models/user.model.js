const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// creating the schema
const userschema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3,"First name should be not less then 3 charater"]
        },
        lastname:{
            type: String,
            minlength:[3,"lastname should be not less then 3 charater"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"email should be not less then 5 charater"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketid:{
        type:String
    }
       
});
// generating JWt token 
userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_Secret, { expiresIn: '2d' })
    return token;
}
//comparing the hashed password
userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}
// converting the password into hash password
userschema.statics.hashPassword = async function (password) { // Change 'static' to 'statics'
    return await bcrypt.hash(password, 10);
}
// creating the model

const usermodel = new mongoose.model('users',userschema);



module.exports= usermodel;
