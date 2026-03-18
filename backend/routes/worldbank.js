const express = require('express');
const router = express.Router();
const worldbankController = require('../controllers/worldbankController');

router.get('/', worldbankController.getAllIndicators);
router.get('/:code', worldbankController.getIndicatorByCode);

module.exports = router;
