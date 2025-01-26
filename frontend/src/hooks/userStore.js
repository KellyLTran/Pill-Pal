import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; // Import your axios instance

// Create a Zustand store for user state
const useUserStore = create((set) => ({
  user: null, // Logged-in user data
  token: null, // JWT token
  isAuthenticated: false, // Authentication status

  // Method to handle login
  login: async (email, password) => {
    console.log(`Logging in with ${email} and ${password}`)
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      console.log(`response: ${response}`)

      const { token, user } = response.data;

      // Update the store with the logged-in user and token
      set({ user, token, isAuthenticated: true });

      return true
    } catch (error) {
      console.error('Login error:', error);
      throw error;

    }
  },

  // Method to handle signup
  signup: async (email, name, password) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        email,
        name,
        password,
      });

      const { token, user } = response.data;

      // Update the store with the new user and token
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Method to handle logout
  logout: () => {
    // Clear the user and token from the store
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Method to check authentication status (e.g., on page reload)
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check', {
        headers: {
          Authorization: `Bearer ${useUserStore.getState().token}`,
        },
      });

      const { user } = response.data;

      // Update the store with the logged-in user
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export default useUserStore;