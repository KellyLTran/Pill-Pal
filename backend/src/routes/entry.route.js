import express from 'express'

import {deleteEntry, addEntry} from "../controllers/entry.controller.js" 


const entryRoute = express.Router()

entryRoute.delete("/:entryID", deleteEntry);
entryRoute.post("/:userID/:medicationID", addEntry);

export default entryRoute;