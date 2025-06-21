import React,{useEffect, useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CaptainContext } from '../context/CaptainContext';


function CaptainProtectedRoute({children}) {

    const {captainData, updateCaptainData} = useContext(CaptainContext);
   
    const [loading, setLoading] = useState(true)
    // This component is used to protect the routes for the user
    // If the user is not logged in, they will be redirected to the login page
    const navigate=useNavigate()
    const token = localStorage.getItem('token')
   useEffect(()=>{
        
        if (!token) {
          navigate('/Captain-login');
        }
    },[token]);
    if (loading){ 
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/profile`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
        
        if (response.status === 200) {
            setLoading(false)
            updateCaptainData(response.data.captain);
           
        }
    }
    ).catch((error) => {
        console.log("error",error);
        navigate('/Captain-login');
    });
}
  return (
    <>
        {loading?<h1>Loading...</h1>:children}
    </>
  )

}


export default CaptainProtectedRoute;