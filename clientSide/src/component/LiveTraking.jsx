// components/UserLocationMap.jsx
import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%',
};

const LiveTraking = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
 
  const updateInterval = 10000; // Update every 10 seconds
 
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${ import.meta.env.VITE_GOOGLE_MAP_API_KEY }`, // Replace with your real key
  });

  useEffect(() => {
    // Function to get current position

   
    const updatePosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setUserLocation(newLocation);

            // Smoothly pan to new location
            if (map) {
              map.panTo(newLocation);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    // Initial location fetch
    updatePosition();

    // Set interval to update location
    const intervalId = setInterval(updatePosition, updateInterval);

    return () => clearInterval(intervalId);
  }, [map]);

  if (!isLoaded) return <div>Loading Map...</div>;
  if (!userLocation) return <div>Getting your live location...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={15}
      onLoad={mapInstance => setMap(mapInstance)}
    >
      <Marker
        position={userLocation}
       
      />
    </GoogleMap>
  );
};

export default LiveTraking;
