import React, { useState ,useRef,useEffect, useContext, use} from "react";
import { Link } from "react-router-dom";
import CaptainDetail from "../component/CaptainDetail";
import RidePopUp from "../component/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidPopUp from "../component/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketProvider";
import { CaptainContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTraking from "../component/LiveTraking";


function CaptainHome() {
  const ridePopUpRef = useRef(null)
  const [ridePopUp, setRidePopUp] = useState(false);
  const confirmRidePopUpRef = useRef(null)
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);
 
  const { captainData, updateCaptainData } = useContext(CaptainContext);
  const [newRide ,setNewRide] = useState(null)
  const { socket, socketId } = useContext(SocketContext);

  useEffect(() => {
    if (!socket || !captainData?._id) return;

    socket.emit("join", {
      userID: captainData._id,
      userType: "captain",
    });

    const handleLocationUpdate = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude)
          socket.emit("update-location-captain", {
            captainId: captainData._id,
            location: {
              ltd: latitude,
              lng: longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

   setInterval(handleLocationUpdate, 10000);

    handleLocationUpdate();

    
  }, [socket, socketId, captainData?._id]);

  useEffect(() => {
    if (socketId) {
      console.log("Home socket ID updated:", socketId);
    }
  }, [socketId]);

  socket.on("sendRide",(data)=>{
    console.log("ride data:",data)
    setNewRide(data)
    if(data){
      setRidePopUp(true)
    }
  })

  async function acceptRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/rides/confirm`,
        {
          rideId: newRide._id,
          captainId: captainData._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (e) {
      console.error("Error in acceptRide [captain]:", e.response?.data || e.message);
    }
  }
  
  
  

  useGSAP(() => {
    if (ridePopUp) {
      gsap.to(ridePopUpRef.current, {
        transform: "translateX(0%)",
      });
    }else{
    gsap.to(ridePopUpRef.current,{
      transform: "translateX(-100%)",
      duration: 0,
    })
  }
  }, [ridePopUp]);

  useGSAP(() => {
    if (confirmRidePopUp) {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateX(0%)",
      });
    }else{
    gsap.to(confirmRidePopUpRef.current,{
      transform: "translateX(-100%)",
      duration: 0,
    })
  }
  }, [confirmRidePopUp]);




  return (
    <div className="h-screen   overflow-hidden relative">
      <div className="h-[60%] relative w-full "> 
      <Link to='/captain-logout' className='fixed  top-14 right-0.5 bg-white px-4 py-3 rounded-full m-2 z-30'>
      <i className="ri-logout-box-r-line text-2xl text-black font-bold "></i> 
      </Link> 
        <div className=" w-full h-full object-cover ">
          <LiveTraking/>
          </div>
        <img
          className="w-24 sm:w-32 md:w-40 object-contain absolute top-14 left-4"
          src="https://logolook.net/wp-content/uploads/2022/02/Uber-Logo.png"
          alt="Uber Logo"
        />
      </div>
      <div >
        <CaptainDetail/>
      </div>
      <div ref={ridePopUpRef} className="absolute bottom-0 bg-[#fff] -translate-x-full w-full  ">
            <RidePopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} newRide={newRide} acceptRide={acceptRide}/> 
      </div>
      <div ref={confirmRidePopUpRef} className="absolute bottom-0 h-[75%] bg-[#fff] -translate-x-full w-full  ">
            <ConfirmRidPopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} newRide={newRide} /> 
      </div>
    </div>
  );
}

export default CaptainHome;
