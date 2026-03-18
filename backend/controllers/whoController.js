const fs = require('fs');
const path = require('path');

const whoData = JSON.parse(fs.readFileSync(path.join(__dirname, '../who.json'), 'utf8'));

exports.getAllIndicators = (req, res) => {
  try {
    res.json({
      success: true,
      count: whoData.length,
      data: whoData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getIndicatorByUuid = (req, res) => {
  try {
    const indicator = whoData.find(i => i.uuid === req.params.uuid);
    if (!indicator) {
      return res.status(404).json({ success: false, message: 'Indicator not found' });
    }
    res.json({
      success: true,
      data: indicator
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
