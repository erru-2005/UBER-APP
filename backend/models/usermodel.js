const mongoose =require('mongoose');


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
       
})