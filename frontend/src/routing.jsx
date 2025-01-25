import React from 'react'
import { Route, Routes as BrowserRoutes, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/HomePage';

import { useAuthStore } from './hooks/authStore';


const Routes = () => {

  const {authUser} = useAuthStore();

  

  return (
    <BrowserRoutes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to="/homepage"/>}/>
      <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to="/homepage"/>}/>
      <Route path="/homepage" element={authUser? <HomePage/> : <Navigate to="/login"/>}/>
    </BrowserRoutes>
  )
} 

export default Routes;