const dotenv= require('dotenv');
dotenv.config();
const http = require('http');
const app= require('./app');
const {initializeSocket} = require('./socket');

const PORT = process.env.PORT || 3000;

server=http.createServer(app);

initializeSocket(server);


server.listen( PORT,()=>{
    console.log("Port connected to port number:"+ PORT);
});