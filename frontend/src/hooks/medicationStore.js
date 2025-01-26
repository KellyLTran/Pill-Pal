import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useMedicationStore = create((set) => ({
  allMeds: [], // List of all medications
  selectedMed: '', // ID of the selected medication

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

  // Record an entry for the selected medication
  recordEntry: async (userId) => {
    const { selectedMed } = useMedicationStore.getState();
    if (!userId || !selectedMed) return;

    try {
      await axiosInstance.post(`/entry/${userId}/${selectedMed}/`, {
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