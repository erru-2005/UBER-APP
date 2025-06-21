import React, { createContext, useState } from 'react';

// Create the CaptainContext
export const CaptainContext = createContext();

// Create a provider component
const CaptainProvider = ({ children }) => {
    const [captainData, setCaptainData] = useState(null);
    
    const updateCaptainData = (data) => {
       
     
        setCaptainData(data);
      
    };
    
    return (
        <CaptainContext.Provider value={{ captainData, updateCaptainData }}>
            {children}
        </CaptainContext.Provider>
    );
};

export default CaptainProvider