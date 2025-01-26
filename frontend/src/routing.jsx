import React from 'react';
import { Route, Routes as BrowserRoutes, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/HomePage';
import History from './pages/History';

import useUserStore from './hooks/userStore';

const Routes = () => {
  const { isAuthenticated, user } = useUserStore();

  return (
    <div className='mt-30'>
      <BrowserRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <History /> : <Navigate to="/login" />}
        />
      </BrowserRoutes>
    </div>
  );
};

export default Routes;