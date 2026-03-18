const express = require('express');
const router = express.Router();
const {
  getAllGiProducts,
  getGiProductById,
  searchGiProducts
} = require('../controllers/fallbackController');

// GET /api/giproducts/search - Search GI products by query
router.get('/search', searchGiProducts);

// GET /api/giproducts - Get all GI products (supports category and origin filters)
router.get('/', getAllGiProducts);

// GET /api/giproducts/:id - Get GI product by application_no or sl_no
router.get('/:id', getGiProductById);

module.exports = router;
