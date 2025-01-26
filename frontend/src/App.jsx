import React, { useEffect } from 'react';
import { axiosInstance } from './lib/axios';
import Routes from './routing';

import useUserStore  from './hooks/userStore';

const testUser = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
};

import Navbar from './components/Navbar'

function App() {

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className='pt-20'> 
        <Routes/>
      </div>
    </div>
  )
}

export default App