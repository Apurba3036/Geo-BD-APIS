const District = require('../models/District');

exports.getAllDistricts = async (req, res) => {
  try {
    const { division_id } = req.query;
    let query = {};
    
    if (division_id) {
      query.division_id = division_id;
    }
    
    const districts = await District.find(query)
      .populate('division', 'id name bn_name url')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      data: districts,
      count: districts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching districts',
      error: error.message
    });
  }
};

exports.getDistrictById = async (req, res) => {
  try {
    const district = await District.findOne({ id: req.params.id })
      .populate('division', 'id name bn_name url')
      .populate('upazilas', 'id name bn_name url');
    
    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'District not found'
      });
    }

    res.json({
      success: true,
      data: district
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching district',
      error: error.message
    });
  }
};

exports.searchDistricts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const districts = await District.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bn_name: { $regex: q, $options: 'i' } }
      ]
    })
      .populate('division', 'id name bn_name url')
      .limit(10);
    
    res.json({
      success: true,
      data: districts,
      count: districts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching districts',
      error: error.message
    });
  }
};
