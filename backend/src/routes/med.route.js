import express from 'express'

import { getAllMedications, getMedication} from '../controllers/med.controller.js'

const medRouter = express.Router()

// GET all meds
medRouter.get('/', getAllMedications);

// GET a single med
medRouter.get('/:medicationID', getMedication);

export default medRouter;