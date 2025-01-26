import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import useUserStore from './userStore'; // Import user store to access user ID

const useMedicationStore = create((set, get) => ({
  allMeds: [], // List of all medications
  selectedMed: '', // ID of the selected medication
  selectedTime: '', // Selected time for the entry

  // Fetch all medications
  fetchAllMeds: async () => {
    try {
      const response = await axiosInstance.get('/medication/');
      if (response.data && response.data.allMedications) {
        set({ allMeds: response.data.allMedications });
      }
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  },

  // Set the selected medication
  setSelectedMed: (medId) => set({ selectedMed: medId }),

  // Set the selected time
  setSelectedTime: (time) => set({ selectedTime: time }),

  // Record an entry for the selected medication
  recordEntry: async () => {
    const { selectedMed, selectedTime } = get();
    const { user } = useUserStore.getState(); // Get user ID from user store

    if (!user || !selectedMed || !selectedTime) return;

    try {
      await axiosInstance.post(`/entry/${user._id}/${selectedMed}/`, {
        usedAt: new Date().toISOString(),
      });
      alert('Entry recorded successfully!');
      
    } catch (error) {
      console.error('Error recording entry:', error);
      alert('Failed to record entry. Please try again.');
    }
  },
}));

export default useMedicationStore;