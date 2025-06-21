
const cors= require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const userrouter = require("./Routes/user.router")
const connection = require("./DB/db");
const captainRouter=require('./Routes/captain.router');
const mapRoutes = require('./Routes/maps.router');
const rideRouter = require('./Routes/ride.route');


const app= express();
app.use(cors({
      origin: "*", // Replace with your frontend URL
      methods: ["GET", "POST"],
      credentials: true
    }));
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connection();
app.get('/',(req,resp)=>{
    resp.send("hello world")
});
app.use('/users',userrouter)
app.use('/captains',captainRouter)
app.use('/maps', mapRoutes); 
app.use('/rides', rideRouter);

module.exports = app;
