import express from 'express'

import {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  } from '../controllers/entry.controller.js'

const router = express.Router()

// GET all entries
router.get('entry/', getEntries)

// GET a single entry
router.get('api/:userID/entry/:entryID', getEntry)

// POST a new entry
router.post('api/:userID/entry/:medicationID', createEntry)

// DELETE an entry
router.delete('api/:userID/entry/:entryID', deleteEntry)

export default router;