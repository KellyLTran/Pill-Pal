import Medication from '../models/medication.model.js'
import mongoose from 'mongoose'

// Get all medicines
export const getMeds = async (req, res) => {
    const medicines = await Med.find({}).sort({createdAt: -1})
}

// Get a single medicine
export const getMed = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine = await Med.findById(id)

    if (!medicine) {
        return res.status(404).json({error: 'No such medicine'})
    }
    res.status(200).json(medicine)
}

// Create new medicine
export const createMed = async (req, res) => {
    const {name, dosage, release, sleep} = req.body

    // add doc to db
    try {
        const medicine = await Med.create({name, dosage, release, sleep})
        res.status(200).json(medicine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
 
// Delete a medicine
export const deleteMed = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine = await Med.findOneAndDelete({_id: id})

    if (!medicine) {
        return res.status(404).json({error: 'No such medicine'})
    }

    res.status(200).json(medicine)
}


// Update a medicine
export const updateMed = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine = await Med.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!medicine) {
        return res.status(404).json({error: 'No such medicine'})
    }

    res.status(200).json(medicine)
}
