const express = require('express');
const router = express.Router();
const {
  getAllDistricts,
  getDistrictById,
  searchDistricts
} = require('../controllers/fallbackController');

// GET /api/districts - Get all districts (optionally filtered by division_id)
router.get('/', getAllDistricts);

// GET /api/districts/search - Search districts
router.get('/search', searchDistricts);

// GET /api/districts/:id - Get district by ID with upazilas
router.get('/:id', getDistrictById);

module.exports = router;
