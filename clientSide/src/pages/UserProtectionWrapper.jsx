import React,{useEffect, useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { userDataProvider } from '../context/UserContext';

function CaptainProtectedRoute({children}) {
   
    const [loading, setLoading] = useState(true)
    const {data,setData} = useContext(userDataProvider)
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
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
       
        if (response.status === 200) {
            setLoading(false)
            setData(response.data.user); 
            console.log(response.data.user)
           
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