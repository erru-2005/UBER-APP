import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected to socket ", newSocket.id);
      setSocketId(newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("disconnected from socket", newSocket.id);
      setSocketId(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, socketId }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
