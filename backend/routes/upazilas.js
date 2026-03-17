const express = require('express');
const router = express.Router();
const {
  getAllUpazilas,
  getUpazilaById,
  searchUpazilas
} = require('../controllers/fallbackController');

// GET /api/upazilas - Get all upazilas (optionally filtered by district_id)
router.get('/', getAllUpazilas);

// GET /api/upazilas/search - Search upazilas
router.get('/search', searchUpazilas);

// GET /api/upazilas/:id - Get upazila by ID
router.get('/:id', getUpazilaById);

module.exports = router;
