import { axiosInstance } from './axios';
import useUserStore from '../store/userStore';

const testUser = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
};

export const ensureTestUser = async () => {
  try {
    // Check if the test user already exists
    const response = await axiosInstance.get(`/api/auth/check-email?email=${testUser.email}`);
    if (response.data.exists) {
      console.log('Test user already exists.');
      return;
    }

    // Create the test user
    await axiosInstance.post('/api/auth/signup', testUser);
    console.log('Test user created successfully.');
  } catch (error) {
    console.error('Error ensuring test user:', error);
  }
};