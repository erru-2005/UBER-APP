const mongoose = require('mongoose');

function connection()
{
mongoose.connect(process.env.conectionvar).then(()=>console.log("connected successfull to DB"))
.catch((e)=>{
    console.log("error while connecting"+ e.message)
})
}

module.exports = connection;