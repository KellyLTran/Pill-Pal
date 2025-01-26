import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../hooks/userStore';
import { axiosInstance } from '../../lib/axios';

const testUser = {
  email: 'guysmail@email.com',
  name: 'Test User',
  password: 'password',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to handle login errors

  const { login, isAuthenticated } = useUserStore();

  // Automatically log in the test user in development mode
  useEffect(() => {
    const autoLoginTestUser = async () => {
      try {
        // Check if the app is in development mode
        if (import.meta.env.VITE_DEV_MODE === 'true') {

          // Update the Zustand store with the logged-in user
          login(testUser.email, testUser.password);

          // Redirect to the home page
          navigate('/home');
        }
      } catch (error) {
        console.error('Error during automatic login:', error);
      }
    };

    autoLoginTestUser();
  }, [login, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Call the login function from the store
      const loginSuccess = await login(loginForm.email, loginForm.password);

      // Redirect to the home page on successful login
      if (loginSuccess) navigate('/home');
    } catch (err) {
      // Handle login errors
      setError('Login failed. Please check your email and password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="font-montserrat font-bold bg-[#ff6b6b] h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Login Here</h1>

        {/* Display error message if login fails */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              Signup here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}