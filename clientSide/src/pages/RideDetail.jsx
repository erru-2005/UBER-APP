import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef,useState } from "react";
import FinishRide from "../component/FinishRide";
import { useLocation } from 'react-router-dom';
import LiveTraking from "../component/LiveTraking";
import axios from "axios";


function RideDetail() {
const [rideDetail, setRideDetail] = useState(false)
const  rideDetailRef = useRef(null)
const location = useLocation();
const { rideData } = location.state || {}; 

useEffect(() => {
  console.log("Ride Data:", rideData.resp._id);
  if (!rideData || !rideData._id) {
    console.warn("No rideData available, skipping sendCaptainLocation");
    return;
  } else {
    async function sendCaptainLocation() {
      console.log("Sending captain location");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/rides/send-captain-location`,
          { rideId: rideData.resp._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

      if (response.status === 200) {
        console.log("request sent successfully", response);
      }
    } catch (e) {
      console.error("Error sending captain location:", e);
    }
  }

  sendCaptainLocation();

}
}, [rideData]);




    useGSAP(() => {
        if (rideDetail) {
          gsap.to(rideDetailRef.current, {
            transform: "translateX(0%)",
          });
        }else{
        gsap.to(rideDetailRef.current,{
          transform: "translateX(-100%)",
          duration: 0,
        })
      }
      }, [rideDetail]);


  return (
    <div className="h-screen   overflow-hidden relative">
      <div className="h-[80%] relative w-full ">
        
        <div
          onClick={() => setRideDetail(false)}
          className=" w-full h-full object-cover"
         >
          <LiveTraking/>
          </div>
        <img
          className="w-24 sm:w-32 md:w-40 object-contain absolute top-4 left-4"
          src="https://logolook.net/wp-content/uploads/2022/02/Uber-Logo.png"
          alt="Uber Logo"
        />
      </div>
      <div onClick={()=>setRideDetail(true)} className="bg-amber-400 w-full h-[20%] relative">
        <div className="w-full flex justify-center items-center text-4xl text-gray-400">
          <i
            
            className="ri-arrow-up-wide-line"
          ></i>
        </div>
        <div className=" h-[8rem] flex justify-between items-center w-full absolute px-5">
          <h3 className="font-bold text-2xl  ">{rideData?.resp.distance}</h3>
          <button  className="bg-green-600 py-3 px-7 rounded-lg ">
            Complete Ride
          </button>
        </div>
      </div>
      <div ref={rideDetailRef} className="absolute bottom-0 h-[75%] bg-[#fff] -translate-x-full w-full  ">
            <FinishRide setRideDetail={setRideDetail} rideData={rideData?.resp}/>
      </div>
    </div>
  );
}

export default RideDetail;
