import Medication from '../models/medication.model.js'
import mongoose from 'mongoose'

// Get all medicines
export const getAllMedications = async (req, res) => {
  const allMedications = await Med.find({}).sort({createdAt: -1})

  res.send(200).json({allMedications});
}

// Get a single medicine
export const getMedication = async (req, res) => {
    const {medicationID} = req.params

    if (!mongoose.Types.ObjectId.isValid(medicationID)) {
        return res.status(404).json({message: 'Invalid parameters!'})
    }

    const medication = await Med.findById(medicationID)

    if (!medication) {
        return res.status(404).json({message: 'No medication exists.'})
    }
    res.status(200).json(medication)
}