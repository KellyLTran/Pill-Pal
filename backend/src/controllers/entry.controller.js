import Entry from '../models/entry.model.js'
import mongoose from 'mongoose';

// Get all entries
export const getAllEntries = async (req, res) => {
    const allEntries = await Entry.find({}).sort({createdAt: -1})

    res.send(200).json({allEntries});
};


// Get a single entry
export const getEntry = async (req, res) => {
    const {entryID} = req.params

    if (!mongoose.Types.ObjectId.isValid(entryID)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Entry.findById(entryID)

    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }
    res.status(200).json(entry)
}


// Create a new entry
export const createEntry = async (req, res) => {
    const {usedAt, medication} = req.body

    // add doc to db
    try {
        const entry = await Entry.create({usedAt, medication})
        res.status(200).json(entry)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
 
// Delete an entry 
export const deleteEntry = async(req, res) => {
    const {entryID} = req.params

    if (!mongoose.Types.ObjectId.isValid(entryID)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Entry.findOneAndDelete({_id: entryID})

    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(entry)
}
