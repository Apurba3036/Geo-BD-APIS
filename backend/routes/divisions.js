const express = require('express');
const router = express.Router();
const {
  getAllDivisions,
  getDivisionById
} = require('../controllers/fallbackController');

// GET /api/divisions - Get all divisions
router.get('/', getAllDivisions);

// GET /api/divisions/:id - Get division by ID
router.get('/:id', getDivisionById);

// GET /api/divisions/:id/districts - Get division with its districts
router.get('/:id/districts', getDivisionById); // Simplified for now

module.exports = router;
