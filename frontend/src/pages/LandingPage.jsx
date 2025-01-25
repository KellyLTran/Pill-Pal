import React from 'react'
import { Link } from 'react-router-dom';


export default function LandingPage() {

  return (
    <div className='flex flex-col justify-center text-center'>
      <div>
        <h1 className='mb-3 text-3xl'>Welcome to ____</h1>
      </div>

      <Link 
            to="/login" 
            className='text-blue-600 hover:text-slate-300 px-4 py-2 rounded transition duration-300'
          >
            Login
          </Link>
      <Link 
        to="/signup" 
        className='text-blue-600 hover:text-slate-300 px-4 py-2 rounded transition duration-300'
      >
        Signup
      </Link>

    </div>
  )
}