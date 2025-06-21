import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CaptainContext } from '../context/CaptainContext';

const CaptainLogin = () => {
 
  const navigate = useNavigate();
  const { captainData, updateCaptainData } = useContext(CaptainContext); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sending data to server

    //  API call for login
    try{
      console.log("formData", formData);
    const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/login`, formData)

    if (resp.status === 200) {
     
     localStorage.setItem('token', resp.data.token)
     
     
      updateCaptainData(resp.data.captain); 
      navigate('/captain-home');
    }
  }catch(err)
  {
   
    if(err.response.status==404){
      alert(err.response.data.message)
    }
    
  }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4 sm:p-6'>
      <div className='bg-white w-full max-w-[90%] sm:max-w-[440px] lg:max-w-[480px] rounded-2xl shadow-xl p-6 sm:p-8'>
        <div className='mb-6 sm:mb-8 text-center'>
          <img 
            src="https://logolook.net/wp-content/uploads/2022/02/Uber-Logo.png"
            alt="Uber Logo"
            className='h-6 sm:h-8 mx-auto mb-3 sm:mb-4'
          />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>Welcome Captain</h1>
          <p className='text-sm sm:text-base text-gray-600'>Log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5 sm:space-y-6'>
          <div>
            <label className='block text-sm sm:text-base font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg border focus:border-black focus:outline-none text-base'
              placeholder='example@gmail.com'
              required
            />
          </div>

          <div>
            <label className='block text-sm sm:text-base font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg border focus:border-black focus:outline-none text-base'
              placeholder='Enter your password'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-base'
          >
            Log In
          </button>

          <Link
            to='/Userlogin'
            className='w-full py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-amber-500 transition-colors block text-center text-base'
          >
            Log In as User
          </Link>
        </form>

        <div className='mt-6 text-center text-base'>
          <span className='text-gray-600'>Don't have an account? </span>
          <Link to='/Captain-signup' className='text-black font-semibold hover:underline'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin