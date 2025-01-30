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
  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({ message: "Please provide userID in the URL path." });
  }

  try {
    // Find the user and populate the entryHistory, then populate the medication field in each entry
    const user = await User.findById(userID).populate({
      path: 'entryHistory',
      populate: {
        path: 'medication',
        model: 'medication', // Reference the Medication model
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const entryHistory = user.entryHistory;

    res.status(200).json({ entryHistory });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// import { getGraphFunction, getSleep } from "../lib/graph.js";


export const getGraph = async (req, res) => {
  const { userID } = req.params;
  const { startDate, endDate, currentDate } = req.query;

  // Convert input dates to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const currentDateObj = new Date(currentDate);

  // Validate input dates
  if (isNaN(startDateObj) || isNaN(endDateObj) || isNaN(currentDateObj)) {
    return res.status(400).json({ message: "Invalid date format. Use ISO format (e.g., 2023-10-10T00:00:00.000Z)." });
  }

  try {
    // Fetch the user with their entries and associated medications
    const user = await User.findById(userID)
      .populate({
        path: 'entryHistory',
        populate: {
          path: 'medication',
          model: 'medication',
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const entries = user.entryHistory;

    // Filter entries within the specified date range
    const filteredEntries = entries.filter((entry) => {
      return entry.usedAt >= startDateObj && entry.usedAt <= endDateObj;
    });

    if (filteredEntries.length === 0) {
      return res.status(200).json({ message: "No entries found." });
    }

    const graphData = [];

    // Calculate sleep time based on the first entry's medication
    const medication = filteredEntries[0].medication;
    const sleepMilliseconds = medication.sleep_m * 60000; // Convert minutes to milliseconds
    const sleepDate = new Date(currentDateObj.getTime() + sleepMilliseconds);

    // Generate graph data
    for (const entry of filteredEntries) {
      const entryTime = entry.usedAt.getTime(); // Convert entry time to a timestamp

      // Iterate over the concentration map to accumulate values
      entry.medication.concentration_map.forEach((value, key) => {
        const timeOffset = parseInt(key, 10); // Convert the key to a number
        const actualTime = entryTime + timeOffset * 60000; // Convert minutes to milliseconds and add to entry time

        const existingEntry = graphData.find((data) => data.date.getTime() === actualTime);

        if (existingEntry) {
          existingEntry.intensity += value;
        } else {
          graphData.push({
            date: new Date(actualTime),
            intensity: value,
          });
        }
      });
    }

    // Sort the graph data by date
    graphData.sort((a, b) => a.date - b.date);

    // Return the graph data and sleep date
    return res.status(200).json({
      sleepDate, // When the user can sleep
      graphData, // Graph data for the specified date range
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while fetching graph data." });
  }
};


export const getOverlappingGraph = async (req, res) => {
  const { userID } = req.params;
  const { startDate, endDate, currentDate } = req.query;

  // Convert input dates to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const currentDateObj = new Date(currentDate);

  // Validate input dates
  if (isNaN(startDateObj) || isNaN(endDateObj) || isNaN(currentDateObj)) {
    return res.status(400).json({ message: "Invalid date format. Use ISO format (e.g., 2023-10-10T00:00:00.000Z)." });
  }

  try {
    // Fetch the user with their entries and associated medications
    const user = await User.findById(userID)
      .populate({
        path: 'entryHistory',
        populate: {
          path: 'medication',
          model: 'medication',
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const entries = user.entryHistory;

    // Filter entries within the specified date range
    const filteredEntries = entries.filter((entry) => {
      return entry.usedAt >= startDateObj && entry.usedAt <= endDateObj;
    });

    if (filteredEntries.length === 0) {
      return res.status(200).json({ message: "No entries found." });
    }

    const graphData = [];

    // Calculate sleep time based on the medication with the longest sleep_m value
    // where sleep_m represents the minutes to wait after taking medication before sleeping
    let maxSleepMilliseconds = 0;
    for (const entry of filteredEntries) {
      const sleepMilliseconds = entry.medication.sleep_m * 60000; // Convert minutes to milliseconds
      if (sleepMilliseconds > maxSleepMilliseconds) {
        maxSleepMilliseconds = sleepMilliseconds;
      }
    }
    const sleepDate = new Date(currentDateObj.getTime() + maxSleepMilliseconds);

    // Generate graph data
    for (const entry of filteredEntries) {
      const entryTime = entry.usedAt.getTime(); // Convert entry time to a timestamp

      // Iterate over the concentration map to accumulate values
      entry.medication.concentration_map.forEach((value, key) => {
        const timeOffset = parseInt(key, 10); // Convert the key to a number
        const actualTime = entryTime + timeOffset * 60000; // Convert minutes to milliseconds and add to entry time

        const existingEntry = graphData.find((data) => data.date.getTime() === actualTime);

        // Sum the intensity values for multiple entries 
        if (existingEntry) {
          existingEntry.intensity += value;
        } else {
          graphData.push({
            date: new Date(actualTime),
            intensity: value,
          });
        }
      });
    }

    // Sort the graph data by date
    graphData.sort((a, b) => a.date - b.date);

    // Return the graph data and sleep date
    return res.status(200).json({
      sleepDate, // When the user can sleep (based on the medication with the longest sleep_m)
      graphData, // Graph data for the specified date range
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while fetching overlapping graph data." });
  }
};

export const getSleep = async (req, res) => {
  // get the date the user can sleep from the entries and medications being used
}