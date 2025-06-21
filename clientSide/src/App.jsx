import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start.jsx";
import Userlogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup";

import Home from "./pages/Home.jsx";
import UserProtectionWrapper from "./pages/UserProtectionWrapper.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectedRoute from "./pages/CaptainProtectedRoute.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import Riding from "./pages/Riding.jsx";
import RideDetail from "./pages/RideDetail.jsx";


function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Usersignup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding/>} />
        <Route path="/riding-detail" element={<RideDetail/>} />
        <Route path="/Captain-login" element={<CaptainLogin />} />
        <Route path="/Captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectionWrapper>
              <Home />
            </UserProtectionWrapper>
          }
        />
        <Route
          path="/userlogout"
          element={
            <UserProtectionWrapper>
              <UserLogout />
            </UserProtectionWrapper>
          }
        />
         <Route
          path="/captain-home"
          element={
            <CaptainProtectedRoute>
            <CaptainHome/>
            </CaptainProtectedRoute>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <CaptainProtectedRoute>
            <CaptainLogout/>
            </CaptainProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
