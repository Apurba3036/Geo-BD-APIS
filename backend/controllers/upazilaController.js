const Upazila = require('../models/Upazila');

exports.getAllUpazilas = async (req, res) => {
  try {
    const { district_id } = req.query;
    let query = {};
    
    if (district_id) {
      query.district_id = district_id;
    }
    
    const upazilas = await Upazila.find(query)
      .populate('district', 'id name bn_name lat lon url')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      data: upazilas,
      count: upazilas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upazilas',
      error: error.message
    });
  }
};

exports.getUpazilaById = async (req, res) => {
  try {
    const upazila = await Upazila.findOne({ id: req.params.id })
      .populate('district', 'id name bn_name lat lon url');
    
    if (!upazila) {
      return res.status(404).json({
        success: false,
        message: 'Upazila not found'
      });
    }

    res.json({
      success: true,
      data: upazila
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upazila',
      error: error.message
    });
  }
};

exports.searchUpazilas = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const upazilas = await Upazila.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bn_name: { $regex: q, $options: 'i' } }
      ]
    })
      .populate('district', 'id name bn_name lat lon url')
      .limit(20);
    
    res.json({
      success: true,
      data: upazilas,
      count: upazilas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching upazilas',
      error: error.message
    });
  }
};
