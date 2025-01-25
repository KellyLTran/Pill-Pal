import Medication from '../models/medication.model.js'
import mongoose from 'mongoose'

// Get all medicines
export const getAllMedications = async (req, res) => {
  try {
    const allMedications = await Medication.find({}).sort({ createdAt: -1 });
    res.status(200).json({ allMedications }); // Corrected: Use res.status(200).json()
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Get a single medicine
export const getMedication = async (req, res) => {
  const { medicationID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(medicationID)) {
    return res.status(404).json({ message: 'Invalid parameters!' });
  }

  try {
    const medication = await Medication.findById(medicationID);

    if (!medication) {
      return res.status(404).json({ message: 'No medication exists.' });
    }
    
    res.status(200).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};