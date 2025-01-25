import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";
import mongoose from 'mongoose';

export const getHistory = async (req, res) => {
  const {userID} = req.params;
  const allEntries = await Entry.find({}).sort({createdAt: -1})
  res.send(200).json({allEntries});

}

export const getEntry = async (req, res) => {
  const {userID, entryID} = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryID)) {
      return res.status(404).json({error: 'Invalid parameters!'})
  }

  const entry = await Entry.findById(entryID)

  if (!entry) {
      return res.status(404).json({error: 'No entry exists.'})
  }
  res.status(200).json(entry)
  
}

export const deleteEntry = async (req, res) => {
  const {userID, entryID} = req.params;

  if (!mongoose.Types.ObjectId.isValid(entryID)) {
      return res.status(404).json({error: 'No entry exists.'})
  }

  const entry = await Entry.findOneAndDelete({_id: entryID})

  if (!entry) {
      return res.status(404).json({error: 'No entry exists.'})
  }

  res.status(200).json(entry)
}


export const addEntry = async (req, res) => {
  const { userID, entryID } = req.params;
  const { dateAdded, usedAt, medication } = req.body; 

  try {
    const entry = await Entry.create({usedAt, medication})
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
