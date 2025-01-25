import User from "../models/user.model.js";



export const getHistory = async (req, res) => {
  res.status(100).json("get history route")

}

export const getEntry = async (req, res) => {
  res.status(100).json("get entry route")
}

export const deleteEntry = async (req, res) => {
  res.status(100).json("delete entry route")

}

export const addEntry = async (req, res) => {
  res.status(100).json("add entry route")
}