const express = require('express')
const {
    createMed,
    getMeds,
    getMed,
    deleteMed,
    updateMed
} = require('../controllers/MedController.js')

const router = express.Router()

// GET all meds
router.get('/', getMeds)

// GET a single med
router.get('/:id', getMed)

// POST a new med
router.post('/', createMed)

// DELETE a med
router.delete('/:id', deleteMed)

// UPDATE a med
router.patch('/:id', updateMed)

module.exports = router