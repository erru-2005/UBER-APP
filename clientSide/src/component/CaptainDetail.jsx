import React ,{ useContext } from 'react'
import {CaptainContext} from '../context/CaptainContext.jsx'

function CaptainDetail() {

  const {captainData, updateCaptainData} = useContext(CaptainContext);


  return (
    <div className="bg-white h-1/2 w-full flex flex-col justify-start items-center ">
         <div className="flex items-center justify-between  w-[90%]  px-4 py-2 rounded-lg mt-14 mb-2 bg-[#f0f0f0]"> 
          <div className="flex items-center justify-start gap-4 w-[80%]">
            <div className="  w-15    rounded-full h-15 bg-gray-300 flex justify-center items-center relative">
              <img
                className="w-full h-full rounded-full object-cover absolute top-0 left-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQzAOKLpyXHBatylQVyAcxmc8e_RwrTLzHA&s"
                alt="Profile"
              />
            </div>
            <h2 className="text-2xl font-bold">{captainData.fullname.firstname+" "+captainData.fullname.lastname}</h2>
          </div>
          <div className="flex flex-col items-start mt-4 justify-center">
            <h3 className="text-xl font-bold">₹294.30</h3>
            <p className="text-gray-500 text-sm">Earned</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-[90%] px-4 py-2 rounded-lg my-7 bg-[#ffeeee] shadow-lg">
            <div className="flex flex-col items-center mt-4 justify-center gap-0.5">
              <h2 className="text-4xl font-light"><i className="ri-time-line"></i></h2>
              <h3 className="text-xl font-bold">1:45</h3>
              <p className="text-gray-500 text-sm">Hours Online</p>
            </div>

            <div className="flex flex-col items-center mt-4 justify-center gap-0.5">
              <h2 className="text-4xl font-light"><i className="ri-speed-up-fill"></i></h2>
              <h3 className="text-xl font-bold">30km</h3>
              <p className="text-gray-500 text-sm">Total Distance</p>
            </div>

            <div className="flex flex-col items-center mt-4 justify-center gap-0.5">
              <h2 className="text-4xl font-light"><i className="ri-booklet-line"></i></h2>
              <h3 className="text-xl font-bold">10.2</h3>
              <p className="text-gray-500 text-sm">Hours Online</p>
            </div>
            
        </div>
    </div>
  )
}

export default CaptainDetail