const socketIO = require("socket.io");
const captainModel = require("./models/captain.model");
const userModel = require("./models/user.model");
const rideModel = require("./models/createRide.model");



 let io;
 

const initializeSocket = (httpServer) => {
   
    io = socketIO(httpServer, {
    cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
    },
    });
 

    io.on("connection", (socket) => {
       
         console.log(`User connected: ${socket.id}`);
        
    socket.on("join",async (data) => {
        const {userID ,userType} = data;
        console.log(`User with ID ${userID} joined as ${userType}`);
        if (userType === "user") {
           
            
           await userModel.findByIdAndUpdate(userID, { socketid: socket.id }) 
        }
        else if (userType === "captain") {
           
            await captainModel.findByIdAndUpdate(userID, { socketid: socket.id }) 
        }  
      }) 


      socket.on('update-location-captain', async ({ captainId, location }) => {
        const { ltd, lng } = location;

        await captainModel.findByIdAndUpdate(
          captainId,
          {
            location: {
              type: 'Point',
              coordinates: [lng, ltd]
            }
          }
        );

      const ride = await rideModel.findOne({
      captainId,
      status: "ongoing" // or whatever field you use
      }).populate('userId'); // populate to get socketid of user

    if (!ride || !ride.userId || !ride.userId.socketid) {
      console.log("No active ride or rider found for this captain");
      return;
    }

    // Send the captain's location to the user
    sendMessageById(ride.userId.socketid, {
      event: "captain-location",
      data: location
    });

    
  });

    socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    });
    });
   
 };

 

  const sendMessageById = (socketId, message) => {
  
    if (!io) {
        console.error("Socket.io is not initialized.");
        return;
    }
  
    io.to(socketId).emit(message.event, message.data);
   console.log("msg sent to Socket Id:", socketId);

 };

 module.exports = {
    initializeSocket,
    sendMessageById
   
 };
