import React, { useEffect}from "react";
import { Link,useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useState, useRef, useContext } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import SearchLocation from "../component/SearchLocation";
import VahiclePanel from "../component/vahiclePanel";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";
import axios from "axios";
import { userDataProvider } from "../context/UserContext";
import {SocketContext} from "../context/SocketProvider"
import LiveTraking from "../component/LiveTraking";


function Home() {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState('')
  const [active, setActive] = useState(false);
  const [vahiclePanel, setVahiclePanel] = useState(false);
  const inputPanel = useRef(null);
  const LocationArea = useRef(null);
  const vehicleFoundPanelRef = useRef(null);
  const vahiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehicleType,setVehicleType] = useState(null)
  const [rideData, setRideData] = useState(null)
  const [acceptedRide,setAcceptedRide] =useState(null)
  const [activeInput, setActiveInput] = useState(""); // "pickup" or "destination"
  let fareAmt={}
  const navigate = useNavigate()
  const { data } = useContext(userDataProvider);
  const { socket, socketId } = useContext(SocketContext);
  
  useEffect(() => {
    if (socket && socketId && data?._id) {
      socket.emit("join", {
        userID: data._id,
        userType: "user",
      });
      console.log("Join emitted with socketId:", socketId);
    }
  }, [socket, socketId, data]);
  

  if(socket){
    socket.on("Accepted-ride",(data)=>{
          console.log(data)
          if(data){
            setAcceptedRide(data)
            setWaitingForDriver(true)
            setVehicleFoundPanel(false)
          }
    })

    socket.on('start-ride',(data)=>{
      console.log(data)
      if (data){
        navigate('/riding',{
          state:{
            rideData: data
          }
        })
      }

    })
  }

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === "pickup") setPickUp(suggestion);
    else setDestination(suggestion);
   
    
  };

  async function createRide() {
    console.log("Ride Place data",pickUp,destination,vehicleType)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/create-ride`, {
        pickUp: pickUp,
        dropoff: destination,
        vahicleType: vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` || '' // Use the token from localStorage,
        }
      });
      if(response.status === 200){
        console.log(response.data)
        setRideData(response.data.ride)
      } // Handle the response as needed
    } catch (error) {
      console.error("Error creating ride:", error);
    }

  }

  const submitHandler =async (e) => {
    
    e.preventDefault();
    setVahiclePanel(true)
    setActive(false)
    try{
      const resp= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/get-fare`,{
        params:{
          pickUp: pickUp,
          dropoff: destination
  
        },
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}` || '' // Use the token from localStorage,
   
        }
      })
      if(resp.status==200){
        
        fareAmt=resp.data.fare
        setFare(fareAmt)
      }
    
    }
    catch(err){
      console.error("ERROR:",err)
    }
    
  };

  useGSAP(() => {
    if (active) {
      gsap.to(inputPanel.current, {
        top: "0%",
      });
      gsap.to(LocationArea.current, {
        height: "calc(100vh - 9rem)",
        display: "block",
      });
    } else {
      gsap.to(inputPanel.current, {
        top: "80%",
      });
      gsap.to(LocationArea.current, {
        height: 0,
        display: "none",
      });
    }
  }, [active]);

  useGSAP(() => {
    if (vahiclePanel) {
      gsap.to(vahiclePanelRef.current, {
        transform: "translateX(0%)",
      });
    } else {
      gsap.to(vahiclePanelRef.current, {
        transform: "translateX(-100%)",
        duration: 0,
      });
    }
  }, [vahiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateX(0%)",
      });
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateX(-100%)",
        duration: 0,
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundPanelRef.current, {
        transform: "translateX(0%)",
      });
    } else {
      gsap.to(vehicleFoundPanelRef.current, {
        transform: "translateX(-100%)",
        duration: 0,
      });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateX(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateX(-100%)",
        duration: 0,
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen flex flex-col relative justify-end ">
      <div>
        <Link
          to="/userlogout"
          className="fixed  top-14 right-2 bg-white px-4 py-3 rounded-full m-2 z-30 hover:bg-gray-200 transition-colors duration-300"
        >
          <i className="ri-logout-box-r-line text-2xl text-black font-bold "></i>
        </Link>

        <div
          onClick={() => setVahiclePanel(false)}
          className=" w-full h-screen relative"
        >
          <LiveTraking/>
        </div>
        <img
          className="w-24 sm:w-32 md:w-40 object-contain absolute top-17 left-4"
          src="https://logolook.net/wp-content/uploads/2022/02/Uber-Logo.png"
          alt="Uber Logo"
        />

        <div
          ref={inputPanel}
          className=" bg-[#eee] rounded-t-2xl  h-[20%]  absolute bottom-0   w-full"
          >
          <div className="relative p-[20px] bg-[#eee] ">
            <i
              onClick={() => setActive(false)}
              className="ri-arrow-down-wide-line font-semibold text-[1.78rem]  absolute right-[50%]  top-0 text-gray-400"
            ></i>
            <h5 className="text-2xl font-semibold">Book a Ride</h5>
            <div className="line w-[3rem] h-0.5 bg-black absolute rotate-[270deg] top-26 left-[4.7px]"></div>
            <form>
              <input
                onClick={() => { setActive(true); setActiveInput("pickup"); }}
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
                className="border border-gray-400 rounded-lg w-full px-3.5 py-2 my-2 bg-[#fff] mt-1"
                type="text"
                placeholder="Enter Pick-up location"
              />
              <input
                onClick={() => { setActive(true); setActiveInput("destination"); }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border border-gray-400 rounded-lg w-full px-3.5 py-2  bg-[#fff] mt-1"
                type="text"
                placeholder="Enter your destination"
              />

              <input type="button" value="Book Ride" onClick={(e)=>{submitHandler(e)}} className=" my-3 rounded-lg w-full py-1 bg-amber-400 text-lg font-bold text-white " />
            </form>
          </div>
          <div>
            <div
              ref={LocationArea}
              className="w-full bg-[#f4f6f1] absolute p-6 "
            >
              <SearchLocation
                inputValue={activeInput === "pickup" ? pickUp : destination}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        ref={vahiclePanelRef}
        className="absolute z-10  bg-[#fff] w-full translate-x-[-100%] "
      >
        <VahiclePanel
        selectVehicle={setVehicleType}
          setVahiclePanel={setVahiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
          
        />
      </div>
      <div
        ref={ConfirmRidePanelRef}
        className="absolute z-10  bg-[#fff] w-full translate-x-[-100%] "
      >
        <ConfirmRide
        pickUp={pickUp}
        destination={destination}
        fare={fare}
        setVahiclePanel={setVahiclePanel}
        vehicleType={vehicleType}
        createRide={createRide}
          setVehicleFoundPanel={setVehicleFoundPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={vehicleFoundPanelRef}
        className="absolute z-10  bg-[#fff] w-full translate-x-[-100%] "
      >
        <LookingForDriver 
          rideData={rideData}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="absolute z-10  bg-[#fff] w-full translate-x-[-100%] "
      >
        <WaitingForDriver
         setWaitingForDriver={setWaitingForDriver}
         acceptedRide={acceptedRide}
        
        />
      </div>
    </div>
  );
}

export default Home;