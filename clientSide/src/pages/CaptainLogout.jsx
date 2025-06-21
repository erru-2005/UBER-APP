import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainLogout() {
    const navigate = useNavigate();
    const token=localStorage.getItem('token')
 

     axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((resp)=>{
            if (resp.status===200){
                localStorage.removeItem('token')
                navigate('/Captain-login')
                return;
            }
        })

  return (
    <div>CaptainLogout...</div>
  )
}

export default CaptainLogout