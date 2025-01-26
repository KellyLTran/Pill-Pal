import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import useUserStore  from '../../hooks/userStore';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const {login} = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Form Submitted:', loginForm);
    login(loginForm);
    navigate('/home');

  };

  return (
    <div className="font-montserrat font-bold bg-[#ff6b6b] h-screen flex flex-col justify-center items-center">
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Login Here</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={loginForm.email}
              onChange={handleInputChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={loginForm.password}
              onChange={handleInputChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Login
          </button>
        </form>
        <div className='mt-6 text-center'>

          <p className='text-sm text-gray-600'>
            Dont have an account?{' '}
            <Link to='/signup' className='text-blue-600 hover:text-blue-500'>
              Signup here.
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}