import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

// Helper function to persist state in localStorage
const persistState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Error persisting state:', error);
  }
};

// Helper function to retrieve persisted state from localStorage
const retrieveState = (key) => {
  try {
    const state = localStorage.getItem(key);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error retrieving state:', error);
    return null;
  }
};

const useUserStore = create((set, get) => ({
  user: retrieveState('user') || null, // Initialize from localStorage
  token: retrieveState('token') || null, // Initialize from localStorage
  isAuthenticated: retrieveState('isAuthenticated') || false, // Initialize from localStorage
  isLoading: false, // Loading state for async operations
  error: null, // Error state for async operations

  // Method to handle login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Update the store with the logged-in user and token
      set({ user, token, isAuthenticated: true, isLoading: false });

      // Persist the state in localStorage
      persistState('user', user);
      persistState('token', token);
      persistState('isAuthenticated', true);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Method to handle signup
  signup: async (email, name, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/signup', {
        email,
        name,
        password,
      });

      const { token, user } = response.data;

      // Update the store with the new user and token
      set({ user, token, isAuthenticated: true, isLoading: false });

      // Persist the state in localStorage
      persistState('user', user);
      persistState('token', token);
      persistState('isAuthenticated', true);

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Method to handle logout
  logout: () => {
    // Clear the user and token from the store
    set({ user: null, token: null, isAuthenticated: false });

    // Clear persisted state from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  },

  // Method to check authentication status (e.g., on page reload)
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = get().token;
      if (!token) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }

      const response = await axiosInstance.get('/auth/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = response.data;

      // Update the store with the logged-in user
      set({ user, isAuthenticated: true, isLoading: false });

      // Persist the state in localStorage
      persistState('user', user);
      persistState('token', token);
      persistState('isAuthenticated', true);
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });

      // Clear persisted state from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
  },
}));

export default useUserStore;