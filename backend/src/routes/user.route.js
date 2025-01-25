import express from 'express'

import {getUser, getHistory, getGraph} from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get("/:userID", getUser);
userRouter.get("/:userID/history", getHistory);

userRouter.get("/:userID/graph", getGraph );

export default userRouter;