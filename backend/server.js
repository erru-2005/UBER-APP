const http = require('http');
const app= require('./app');
const { env } = require('process');
const PORT = process.env.PORT || 3000;
const connection = require("./DB/db");


connection();
server=http.createServer(app);


server.listen( PORT,()=>{
    console.log("Port connected to port number:"+ PORT);
});