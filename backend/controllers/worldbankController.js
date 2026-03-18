const worldbankData = require('../worldbank.json');

// @desc    Get all World Bank indicators
// @route   GET /api/worldbank
exports.getAllIndicators = (req, res) => {
  try {
    res.status(200).json(worldbankData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving World Bank data', error: error.message });
  }
};

// @desc    Get specific indicator by code
// @route   GET /api/worldbank/:code
exports.getIndicatorByCode = (req, res) => {
  try {
    const indicator = worldbankData.find(i => i.code === req.params.code);
    if (indicator) {
      res.status(200).json(indicator);
    } else {
      res.status(404).json({ message: 'Indicator not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving indicator', error: error.message });
  }
};
