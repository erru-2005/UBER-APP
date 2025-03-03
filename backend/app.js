
const cors= require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const userrouter = require("./Routes/user.router")
const connection = require("./DB/db");
const { parse } = require('dotenv');
const app= express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connection();
app.get('/',(req,resp)=>{
    resp.send("hello world")
});
app.use('/users',userrouter)

module.exports = app;
