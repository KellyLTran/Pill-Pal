import Entry from '../models/entry.model.js'
const mongoose = require('mongoose')

// Get all entries
const getMeds = async (req, res) => {
    const medicines = await Med.find({}).sort({createdAt: -1})
}

// Get a single entry
const getMed = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const medicine = await Med.findById(id)

    if (!medicine) {
        return res.status(404).json({error: 'No such medicine'})
    }
    res.status(200).json(medicine)
}

// Create new medicine
const createMed = async (req, res) => {
    const {usedAt, medication} = req.body

    // add doc to db
    try {
        const medicine = await Med.create({usedAt, medication})
        res.status(200).json(medicine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
 
// Delete a medicine
const deleteMed = async(req, res) => {
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
const updateMed = async(req, res) => {
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


module.exports = {
    getMeds,
    getMed,
    createMed,
    deleteMed,
    updateMed
}