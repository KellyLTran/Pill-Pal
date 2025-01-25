import express from 'express'

import {getAllMedications, getMedication} from '../controllers/medication.controller.js'

const medicationRouter = express.Router()

// GET all meds
medicationRouter.get('/', getAllMedications);

// GET a single med
medicationRouter.get('/:medicationID', getMedication);

export default medicationRouter;