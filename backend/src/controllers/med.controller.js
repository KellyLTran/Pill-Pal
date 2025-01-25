import Medication from '../models/medication.model.js'
import mongoose from 'mongoose'

// Get all medicines
export const getAllMeds = async (req, res) => {
  const allMedications = await Med.find({}).sort({createdAt: -1})

  res.send("")
}

// Get a single medicine
export const getMed = async (req, res) => {
    const {medicineID} = req.params

    if (!mongoose.Types.ObjectId.isValid(medicineID)) {
        return res.status(404).json({message: 'Invalid parameters!'})
    }

    const medicine = await Med.findById(medicineID)

    if (!medicine) {
        return res.status(404).json({message: 'No medicine exists.'})
    }
    res.status(200).json(medicine)
}