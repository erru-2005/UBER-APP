import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { SocketContext } from '../context/SocketProvider';

function Riding(props) {
  const location = useLocation();
  const { state } = location || {};
  const { rideData } = state || {};
  const { socket, socketId } = useContext(SocketContext);
  const navigate = useNavigate();

  const [captainLocation, setCaptainLocation] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not available");
      return;
    }

    const handleCaptainLocation = (location) => {
      console.log("Captain Location:", location);
      setCaptainLocation({ lat: location.ltd, lng: location.lng });
    };

    const handleEndRide = () => {
      navigate('/home');
    };

    socket.on('captain-location', handleCaptainLocation);
    socket.on('end-ride', handleEndRide);

    return () => {
      socket.off('captain-location', handleCaptainLocation);
      socket.off('end-ride', handleEndRide);
    };
  }, [socket, navigate]);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className='h-screen relative'>
      <Link to='/home' className='fixed top-14 right-0.5 bg-white p-2 rounded-full m-2 z-30'>
        <i className="ri-home-4-line text-2xl text-black font-bold "></i>
      </Link>

      <div className="w-full h-1/2 object-cover">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={captainLocation || { lat: 0, lng: 0 }}
            zoom={15}
            onLoad={map => (mapRef.current = map)}
          >
            {captainLocation && (
              <Marker position={captainLocation} />
            )}
          </GoogleMap>
        )}
      </div>

      <div className='flex flex-col justify-between items-center w-full h-1/2 my-4'>
        <div className="p-2 px-4 flex justify-between w-full">
          <img
            className="h-26"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." // truncated for brevity
            alt="Uber"
          />
          <div className='text-right'>
            <h3 className='capitalize font-bold text-lg'>{rideData?.captainId?.fullname?.firstname}</h3>
            <h2 className='uppercase font-bold text-xl'>{rideData?.captainId?.vehicle?.plate}</h2>
            <p>Maruki Suzuki 800</p>
          </div>
        </div>

        {/* Pickup address */}
        <div className="flex gap-4 items-center p-2 border-b-2 border-gray-300 w-full">
          <i className="ri-map-pin-user-line text-xl"></i>
          <div className="flex flex-col">
            <h3 className="font-bold">562/11-A</h3>
            <p className="text-sm">{rideData?.pickup}</p>
          </div>
        </div>

        {/* Dropoff address */}
        <div className="flex gap-4 items-center mt-2.5 p-2 border-b-2 border-gray-300 w-full">
          <i className="ri-map-pin-2-fill text-xl"></i>
          <div className="flex flex-col">
            <h3 className="font-bold">564/111-B</h3>
            <p className="text-sm">{rideData?.dropoff}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex gap-4 items-center mt-2.5 p-2">
          <i className="ri-money-rupee-circle-fill text-xl"></i>
          <div className="flex flex-col">
            <h3 className="font-bold">₹ {rideData?.fare}</h3>
            <p className="text-sm">Cash</p>
          </div>
        </div>

        {/* Make Payment */}
        <button
          onClick={() => {
            props.setVehicleFoundPanel(true);
            props.setConfirmRidePanel(false);
          }}
          className="bg-green-600 text-white font-semibold rounded-lg px-4 py-2 mt-6 mb-10 w-[90%]"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}

export default Riding;
