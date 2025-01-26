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
  graphData: [], // Graph data state
  sleepDate: null, // Sleep date state, 
  userEntries: [],

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
    set({ user: null, token: null, isAuthenticated: false, graphData: [], sleepDate: null });

    // Clear persisted state from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  },

  // Method to refresh user data from the backend
  refreshUser: async () => {
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

  // Method to fetch graph data
  fetchGraphData: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });

    const now = new Date();
    const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    try {
      const response = await axiosInstance.get(`/user/${user._id}/graph`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          currentDate: now.toISOString(),
        },
      });

      const { graphData, sleepDate } = response.data;

      // Format the graph data for Recharts
      const formattedData = graphData.map((entry) => ({
        date: new Date(entry.date).toLocaleString(),
        intensity: entry.intensity,
      }));

      // Update the store with the graph data and sleep date
      set({ graphData: formattedData, sleepDate: new Date(sleepDate), isLoading: false });
    } catch (error) {
      console.error('Error fetching graph data:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteUserEntry: async (userId, entryId) => {
    try {
      await axiosInstance.delete(`/entry/${userId}/${entryId}`);
      set((state) => ({
        userEntries: state.userEntries.filter((entry) => entry._id !== entryId),
      }));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  },
  fetchUserEntries: async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/history`);
      if (response.data && response.data.entryHistory) {
        const sortedEntries = response.data.entryHistory.sort(
          (a, b) => new Date(b.usedAt) - new Date(a.usedAt)
        );
        set({ userEntries: sortedEntries });
      }
    } catch (error) {
      console.error('Error fetching user entries:', error);
    }
  },

}));

export default useUserStore;