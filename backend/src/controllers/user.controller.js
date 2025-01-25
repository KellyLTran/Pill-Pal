import User from "../models/user.model.js";

export const getHistory = async (req, res) => {
  const {userID} = req.params;

  res.status(100).json({message: "get history route"});

}

export const getEntry = async (req, res) => {
  const {userID, entryID} = req.params;
  
  res.status(100).json({message: "get entry route"})
}

export const deleteEntry = async (req, res) => {
  const {userID, entryID} = req.params;
  
  res.status(100).json({message: "delete entry route"})

}

export const addEntry = async (req, res) => {
  const {userID, entryID} = req.params;
  const {dateAdded} = req.body;

  res.status(100).json({message: "add entry route"})
}

export const getGraph = async (req, res) => {

  const {userID} = req.params;
  const {startDate, endDate, currentDate} = req.status;

}