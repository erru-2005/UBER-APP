import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FinishRide(props) {
  const navigate = useNavigate();
  async function endRide(e) {
    e.preventDefault();
    // Here you would typically call an API to end the ride
    const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/end-ride`, {
      rideId: props.rideData?._id,
    
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    if (resp.status === 200) {
        navigate("/captain-home");
        alert("Ride Completed successfully");
    }

  }
  return (
    <div>
      <div className="w-full  bg-white ">
        
        <div className=" p-5 border-gray-300 rounded-lg  flex flex-col justify-center items-center w-full h-[90%]">
          <div className="w-full flex justify-center items-center text-4xl text-gray-400">
            <i
              onClick={() => props.setRideDetail(false)}
              className="ri-arrow-down-wide-line "
            ></i>
          </div>
          <h2 className="font-bold text-3xl w-full text-left my-4">
        Finish this Ride
          </h2>
          <div className="flex items-center justify-between  w-full  px-4 py-2 rounded-lg border-0 bg-yellow-500">
            <div className="flex items-center justify-start gap-4 w-[80%]">
              <div className="  w-15    rounded-full h-15 bg-gray-300 flex justify-center items-center relative">
                <img
                  className="w-full h-full rounded-full object-cover absolute top-0 left-0"
                  src="data:image/jpeg;base64,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"
                  alt="Profile"
                />
              </div>
              <h2 className="text-2xl font-bold capitalize">{props.rideData?.userId.fullname.firstname+" "+props.rideData?.userId.fullname.lastname}</h2>
            </div>
            <div className="flex flex-col items-start mt-4 justify-center">
              <h3 className="text-xl font-bold">{props.rideData?.distance}</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start  pt-4 w-full my-4">
            {/* address */}
            <div className="flex gap-4 items-center p-2 border-b-2 border-gray-300 w-full my-3">
              <i className="ri-map-pin-user-line text-xl"></i>
              <div className="flex  flex-col">
                <h3 className="font-bold">562/11-A</h3>
                <p className="text-sm">{props.rideData?.pickup}</p>
              </div>
            </div>
            {/*to address8*/}
            <div className="flex gap-4 items-center mt-2.5 p-2 border-b-2 border-gray-300 w-full my-3">
              <i className="ri-map-pin-2-fill text-xl"></i>
              <div className="flex flex-col ">
                <h3 className="font-bold">564/111-B</h3>
                <p className="text-sm">{props.rideData?.dropoff}</p>
              </div>
            </div>
            {/* price */}
            <div className="flex gap-4 items-center  mt-2.5 p-2 my-3">
              <i className="ri-money-rupee-circle-fill text-xl"></i>
              <div className="flex flex-col ">
                <h3 className="font-bold">₹ {props.rideData?.fare}</h3>
                <p className="text-sm">Cash Cash</p>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
             endRide(e)
            }}
            className=" bg-green-600 text-white text-center font-semibold rounded-lg px-4 py-2 mt-7 mb-2 w-[90%]"
          >
            <i className="ri-check-line mr-1"></i>
            Completed Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
