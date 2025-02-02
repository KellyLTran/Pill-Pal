import mongoose from "mongoose";
import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";
import Medication from "../models/medication.model.js";

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
  let { usedAt, reminderTime } = req.body;

  if (!userID || !medicationID) {
    return res.status(400).json({ message: "Please provide userID and medicationID in the URL." });
  }

  // Validate userID and medicationID
  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(medicationID)) {
    return res.status(400).json({ message: "Invalid userID or medicationID!" });
  }

  // Check if medication exists
  const medication = await Medication.findById(medicationID);
  if (!medication) {
    return res.status(404).json({ message: "Medication not found!" });
  }

  // Parse usedAt from body or set to current time
  let usedAtValue = new Date();
  if (usedAt) {
    const parsedDate = new Date(usedAt);
    if (!isNaN(parsedDate.getTime())) {
      usedAtValue = parsedDate;
    } else {
      return res.status(400).json({ message: "Invalid usedAt date format!" });
    }
  }

  try {
    // Find the user
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Handle reminder time
    let reminderTimeObj = null;
    if (reminderTime) {
      reminderTimeObj = new Date(reminderTime);
      if (!isNaN(reminderTimeObj.getTime())) {
        const timeUntilReminder = reminderTimeObj - new Date();
        if (timeUntilReminder > 0) {
          setTimeout(() => {
            console.log(`Reminder: Time to take your medication!`);
          }, timeUntilReminder);
        }
      } else {
        return res.status(400).json({ message: "Invalid reminderTime format!" });
      }
    }

    // Create a new entry
    const entry = await Entry.create({ usedAt: usedAtValue, medication: medicationID, reminderTime: reminderTimeObj });

    // Add the entry to the user's entryHistory
    user.entryHistory.push(entry._id);
    await user.save();

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
