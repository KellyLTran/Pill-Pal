import mongoose from "mongoose";
import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";

export const deleteEntry = async (req, res) => {
  const { userID, entryID } = req.params;

  // Validate userID and entryID
  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(entryID)) {
    return res.status(400).json({ message: "Invalid userID or entryID!" });
  }

  try {
    // Find the user
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the entry exists in the user's entryHistory
    if (!user.entryHistory.includes(entryID)) {
      return res.status(404).json({ message: "Entry not found in the user's history!" });
    }

    // Remove the entry from the user's entryHistory
    user.entryHistory.pull(entryID);
    await user.save();

    // (Optional) Delete the entry from the Entry collection
    await Entry.findByIdAndDelete(entryID);

    res.status(200).json({ message: "Entry deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addEntry = async (req, res) => {
  const { userID, medicationID } = req.params;
  const { usedAt, reminderTime } = req.body;

  // Validate userID
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid userID!" });
  }

  if (!userID || !medicationID) return res.status(400).json({message: "Please submit all url parameters: userID, medicationID"})

  // Validate required fields
  if (!usedAt) return res.status(400).json({ message: "Please provide all of body: usedAt"});

  try {
    // Find the user
    const medicationObjectId = new mongoose.Types.ObjectId(medicationID);

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Remind the user to take medication based on their optional, input reminder time
    let reminderTimeObj = null;
    if (reminderTime) {
      const currentTime = new Date();
      const reminderTimeObj = new Date(reminderTime);
      const timeUntilReminder = reminderTimeObj - currentTime;

      if (timeUntilReminder > 0) {
        setTimeout(() => {
          console.log(`Reminder: Time to take your medication!`);
        }, timeUntilReminder);
      }
    }

    // Create a new entry
    const entry = await Entry.create({ usedAt, medication:medicationObjectId, reminderTime: reminderTimeObj });

    // Add the entry to the user's entryHistory
    user.entryHistory.push(entry._id);
    await user.save();

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};