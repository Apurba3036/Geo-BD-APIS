const express = require('express');
const router = express.Router();
const {
  getAllUnions,
  getUnionById,
  searchUnions
} = require('../controllers/fallbackController');

// GET /api/unions - Get all unions (optionally filtered by upazila_id)
router.get('/', getAllUnions);

// GET /api/unions/search - Search unions
router.get('/search', searchUnions);

// GET /api/unions/:id - Get union by ID
router.get('/:id', getUnionById);

module.exports = router;
