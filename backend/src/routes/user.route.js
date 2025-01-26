import express from 'express'

import {getUser, getHistory, getGraph, getOverlappingGraph} from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get("/:userID", getUser);
userRouter.get("/:userID/history", getHistory);
userRouter.get("/:userID/graph", getGraph);
userRouter.get("/:userID/graph-overlap", getOverlappingGraph);


export default userRouter;