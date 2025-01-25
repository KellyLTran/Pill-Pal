import User from "../models/user.model.js";
import Entry from "../models/entry.model.js";
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

import { getGraphFunction, getSleep } from "../lib/graph.js";

export const getGraph = async (req, res) => {

  const {userID} = req.params;
  const {startDate, endDate, currentDate} = req.status;

  return req.status(200).json({
    sleepDate:"",
    graphData:""
  });
}
