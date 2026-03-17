const Division = require('../models/Division');

exports.getAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find().sort({ name: 1 });
    
    res.json({
      success: true,
      data: divisions,
      count: divisions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching divisions',
      error: error.message
    });
  }
};

exports.getDivisionById = async (req, res) => {
  try {
    const division = await Division.findOne({ id: req.params.id });
    
    if (!division) {
      return res.status(404).json({
        success: false,
        message: 'Division not found'
      });
    }

    res.json({
      success: true,
      data: division
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching division',
      error: error.message
    });
  }
};

exports.getDivisionWithDistricts = async (req, res) => {
  try {
    const division = await Division.findOne({ id: req.params.id })
      .populate('districts', 'id name bn_name lat lon url');
    
    if (!division) {
      return res.status(404).json({
        success: false,
        message: 'Division not found'
      });
    }

    res.json({
      success: true,
      data: division
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching division with districts',
      error: error.message
    });
  }
};
