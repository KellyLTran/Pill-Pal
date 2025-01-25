import express from 'express'

import {getUser, getEntry, getHistory, deleteEntry, addEntry, getGraph} from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get("/:userID", getUser);

userRouter.get("/:userID/history/", getHistory);
userRouter.get("/:userID/history/:entryID", getEntry);
userRouter.delete("/:userID/history/:entryID", deleteEntry);
userRouter.post("/:userID/history/:medicationID", addEntry);

userRouter.get("/:userID/graph", getGraph);

export default userRouter;