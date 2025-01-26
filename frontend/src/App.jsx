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

  const { login, isAuthenticated, checkAuth } = useUserStore();

  useEffect(() => {
    const ensureTestUserAndLogin = async () => {
      try {
        // Check if the app is in development mode
        if (import.meta.env.VITE_DEV_MODE === 'true') {
          // Ensure the test user exists in the database
          const signupResponse = await axiosInstance.post('/api/auth/signup', testUser);
          console.log('Test user created:', signupResponse.data);

          // Log in the test user
          const loginResponse = await axiosInstance.post('api/auth/login', {
            email: testUser.email,
            password: testUser.password,
          });
          console.log('Test user logged in:', loginResponse.data);

          // Update the Zustand store with the logged-in user
          login(testUser.email, testUser.password);
        } else {
          // Check authentication status (for production mode)
          checkAuth();
        }
      } catch (error) {
        console.error('Error ensuring test user or logging in:', error);
      }
    };

    ensureTestUserAndLogin();
  }, [login, checkAuth]);



  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes/>
    </div>
  )
}

export default App