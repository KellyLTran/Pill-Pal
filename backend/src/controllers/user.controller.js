import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";
import Medication from "../models/medication.model.js";
import mongoose from 'mongoose';

export const getUser = async (req, res) => {
  const {userID} = req.params;

  if(!userID) return res.status(404).json({message: "Please put a userID in url parameters!"});

  const user = await User.find({_id: userID});

  if (!user) return res.status(404).json({message: "User doesnt exist."}); 

  res.status(200).json({user});
}

export const getHistory = async (req, res) => {
  const {userID} = req.params;

  if (!userID) return res.status(400).json({message: "Please have userID in url path."});

  const user = await User.findById(userID).populate("entryHistory");

  if (!user) return res.status(400).json({message: "User doesnt exist!"}) 

  const entryHistory = user.entryHistory;

  res.status(200).json({entryHistory});
}

// import { getGraphFunction, getSleep } from "../lib/graph.js";


export const getGraph = async (req, res) => {
  const {userID} = req.params;
  const {startDate, endDate, currentDate} = req.query;

  // Convert query parameters to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Get all the user's entries within the start and end date range 
  const user = await User.findById(userID).populate({
    path: 'entryHistory',
    populate: { path: 'medication' }
  });
  if (!user) {
    return res.status(404).json({message: "User doesn't exist!"});
  }

  const filteredEntries = user.entryHistory.filter(entry => {
    return entry.usedAt >= startDateObj && entry.usedAt <= endDateObj;
  });
  if (filteredEntries.length === 0) {
    return res.status(200).json({message: "No entries found."});
  }

  // Calculate the time to sleep based on the sleep_m variable, accounting for milliseconds in startDate
  const medication = filteredEntries[0].medication;
  const sleepMilliseconds = medication.sleep_m * 60000;
  const sleepDate = new Date(startDateObj.getTime() + sleepMilliseconds);

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
