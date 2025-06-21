import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <>
        <div className="bg-cover bg-bottom bg-[url('https://images.unsplash.com/photo-1695828352681-bf90d2750d42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2l2ZSUyMGElMjB0cmFmZmljJTIwbGlnaHQlMjBwaWN0dXJlfGVufDB8fDB8fHww')] min-h-screen w-full flex flex-col justify-between">
          <div className="container mx-auto px-4 pt-4 sm:pt-6 md:pt-8">
            <img 
              className='w-24 sm:w-32 md:w-40 object-contain' 
              src="https://logolook.net/wp-content/uploads/2022/02/Uber-Logo.png"
              alt="Uber Logo"
            />
          </div>
          <div className='w-full px-4 sm:px-6 md:px-8 py-6 bg-amber-50'>
            <div className="container mx-auto max-w-md">
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>Get Started With Uber</h1>
              <Link to='/Userlogin' className='bg-black flex items-center justify-center text-white p-3 sm:p-4 rounded-lg w-full text-base sm:text-xl md:text-2xl font-bold hover:bg-gray-800 transition-colors '>
                Continue
              </Link>
              
           </div>
          </div>
        </div>
    </>
  )
}

export default Start; 