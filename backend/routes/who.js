const express = require('express');
const router = express.Router();
const whoController = require('../controllers/whoController');

router.get('/', whoController.getAllIndicators);
router.get('/:uuid', whoController.getIndicatorByUuid);

module.exports = router;
