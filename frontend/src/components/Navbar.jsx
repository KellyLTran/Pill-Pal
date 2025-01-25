import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthStore} from '../hooks/authStore'


export default function Navbar() {

  const {authUser, logout} = useAuthStore();

  return (
    <div className='w-full bg-slate-800 shadow-lg mb-4'>
      <div className='container mx-auto flex flex-row justify-start items-center h-16 px-4'>
        <Link 
          to="/" 
          className='text-white hover:text-slate-300 px-4 py-2 rounded transition duration-300'
        >
          App
        </Link>
        {authUser && 
        <button onClick={() => logout} className='text-white hover:text-slate-300 px-4 py-2 rounded transition duration-300'>

        </button>  
        }
      </div>
    </div>
  );
}