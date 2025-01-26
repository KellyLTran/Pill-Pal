import { create } from 'zustand';

// Create a Zustand store for user state
const useUserStore = create((set) => ({
  user: null, // Logged-in user data
  token: null, // JWT token
  isAuthenticated: false, // Authentication status

  // Method to handle login
  login: async (email, password) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token, user } = await response.json();

      // Update the store with the logged-in user and token
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Method to handle signup
  signup: async (email, name, password) => {
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const { token, user } = await response.json();

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
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        headers: { Authorization: `Bearer ${useUserStore.getState().token}` },
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const { user } = await response.json();

      // Update the store with the logged-in user
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export default useUserStore;