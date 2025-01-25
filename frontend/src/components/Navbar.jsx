import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthStore} from '../hooks/authStore'


export default function Navbar() {

  const {authUser, logout} = useAuthStore();


  return (
    <div style={{fontFamily: 'Montserrat', position: "fixed", top: 0}} className='w-full shadow-lg mb-0 mt-0 bg-transparent'>
      <div className='container mx-auto flex flex-row justify-center items-center h-16 px-4'>
        <Link 
          to="/" 
          className='text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300'
        >
          <div>
            <img className="w-20" src="package-lock.png"/>
          </div>
        </Link>

        <Link 
          to="/history" 
          className='text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300'
        >
          Past Dosages
        </Link>

        <Link 
          to="/login" 
          className='text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300'
        >
          Login
        </Link>

        <Link 
          to="/signup" 
          className='text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300'
        >
          Signup
        </Link>
        
        {authUser && 
        <button onClick={() => logout} className='text-white hover:text-slate-300 px-4 py-2 rounded transition duration-300'>

        </button>  
        }
      </div>
    </div>
  );
}