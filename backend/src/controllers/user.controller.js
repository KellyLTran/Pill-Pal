import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";
import Medication from "../models/medication.model.js";
import mongoose from 'mongoose';

export const getUser = async (req, res) => {
  const {userID} = req.params;
  res.status(200).json({
    message: "get user route hit"
  })
}

export const getHistory = async (req, res) => {
  const {userID} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({message: 'Invalid parameters!'});
  }

  const user = await User.findById(userID).populate({
    path: 'entryHistory',
    options: {sort: {createdAt: -1}}
  });
  if (!user) {
    return res.status(404).json({message: 'User not found.'});
  }

  res.status(200).json({allEntries: user.entryHistory});
}


export const getEntry = async (req, res) => {
  const {userID, entryID} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(entryID)) {
      return res.status(404).json({message: 'Invalid parameters!'})
  }

  const user = await User.findById(userID)
  const entry = await Entry.findById(entryID)
  if (!user) {
    return res.status(404).json({message: 'User not found.'});
  }
  if (!entry) {
      return res.status(404).json({message: 'No entry exists.'})
  }

  res.status(200).json(entry)
}


export const deleteEntry = async (req, res) => {
  const {userID, entryID} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(entryID)) {
      return res.status(404).json({message: 'Invalid Parameters!'})
  }

  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({message: 'User not found.'});
  }
  if (!user.entryHistory.includes(entryID)) {
    return res.status(404).json({message: 'Entry not found for this user.'});
  }

  const entry = await Entry.findByIdAndDelete(entryID);
  if (!entry) {
    return res.status(404).json({message: 'No entry exists.'});
  }

  user.entryHistory.pull(entryID);
  await user.save();

  res.status(200).json(entry)
}


export const addEntry = async (req, res) => {
  const {userID, medicationID} = req.params;
  const {dateAdded, usedAt, medication} = req.body; 

  if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(404).json({message: 'Invalid Parameters!'})
  }

  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({message: 'User not found.'});
  }

  const entry = await Entry.create({dateAdded, usedAt, medication});
  user.entryHistory.push(entry._id);
  await user.save();

  res.status(200).json(entry)
}


export const getGraph = async (req, res) => {
  const {userID} = req.params;
  const {startDate, endDate, currentDate} = req.status;

  // Get all entries within the start and end date range 
  const filteredEntries = await User.findById(userID)
  .where('usedAt').gte(startDate).lte(endDate)
  .populate('medication');

  // Calculate the time to sleep based on the sleep_m variable 
  const medication = filteredEntries[0].medication;
  const sleepMinutes = medication.sleep_m;
  const sleepDate = new Date(startDate.getTime() + sleepMinutes);

  // For each entry, get the intensity value associated with the current time
  const graphData = [];
  filteredEntries.forEach(entry => {
  const entryTime = entry.usedAt.getTime().toString();
  const intensityValue = medication.concentration_map.get(entryTime);
  graphData.push({
    date: entry.usedAt,
    intensity: intensityValue 
  })
})

  return req.status(200).json({
    sleepDate,
    graphData
  });
}

