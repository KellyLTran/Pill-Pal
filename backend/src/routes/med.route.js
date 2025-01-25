import express from 'express'

import { } from '../controllers/med.controller.js'

const medRouter = express.Router()

// GET all meds
medRouter.get('/', getAllMeds);

// GET a single med
medRouter.get('/:medicationID', getMed);

export default medRouter;