import { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import useUserStore  from '../../hooks/userStore';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(''); // State to handle login errors
  

  const {signup} = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    try {

    
      if (signupForm.password !== signupForm.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Signup Form Submitted:', signupForm);
      const registerSuccess = await signup(signupForm.email, signupForm.name, signupForm.password);
      if (registerSuccess) navigate("/home");

    } catch (error) {
      setError('Signup failed. Please check your email and password.');
      console.error('Signup error:', error);      
    }
  };

  return (
    <div style={{fontFamily: 'Montserrat', fontWeight: 'bold', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Sign Up</h1>
        
        {/* Display error message if login fails */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}        
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={signupForm.name}
              onChange={handleInputChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your full name'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={signupForm.email}
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
              value={signupForm.password}
              onChange={handleInputChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your password'
              required
            />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={signupForm.confirmPassword}
              onChange={handleInputChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Confirm your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Sign Up
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 hover:text-blue-500'>
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}