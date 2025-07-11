import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainProvider from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketProvider.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainProvider>
      <UserContext>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainProvider>
  </StrictMode>
);