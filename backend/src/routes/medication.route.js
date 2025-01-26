import express from 'express'

import {getAllMedications, getMedication} from '../controllers/medication.controller.js'

const medicationRouter = express.Router()

medicationRouter.get('/', getAllMedications);
medicationRouter.get('/:medicationID', getMedication);

export default medicationRouter;