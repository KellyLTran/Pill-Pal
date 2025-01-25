import express from 'express'

import {getEntry, getHistory, deleteEntry, addEntry} from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get(":userID/history/", getHistory);


userRouter.get(":userID/history/:entryID", getEntry);
userRouter.delete(":userID/history/:entryID", deleteEntry);
userRouter.post(":userID/history/:entryID", addEntry);

export default userRouter;