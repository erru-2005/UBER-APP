import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const navigate = useNavigate();
    const token=localStorage.getItem('token')
 

     axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((resp)=>{
            if (resp.status===200){
                localStorage.removeItem('token')
                navigate('/userlogin')
                return;
            }
        })

        

  return(
  <div>Logging out...</div>
)
};

export default UserLogout;
