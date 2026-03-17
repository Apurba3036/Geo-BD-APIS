const Union = require('../models/Union');

exports.getAllUnions = async (req, res) => {
  try {
    const { upazila_id } = req.query;
    let query = {};
    
    if (upazila_id) {
      query.upazila_id = upazila_id;
    }
    
    const unions = await Union.find(query)
      .populate('upazila', 'id name bn_name url')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      data: unions,
      count: unions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unions',
      error: error.message
    });
  }
};

exports.getUnionById = async (req, res) => {
  try {
    const union = await Union.findOne({ id: req.params.id })
      .populate('upazila', 'id name bn_name url');
    
    if (!union) {
      return res.status(404).json({
        success: false,
        message: 'Union not found'
      });
    }

    res.json({
      success: true,
      data: union
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching union',
      error: error.message
    });
  }
};

exports.searchUnions = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const unions = await Union.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bn_name: { $regex: q, $options: 'i' } }
      ]
    })
      .populate('upazila', 'id name bn_name url')
      .limit(30);
    
    res.json({
      success: true,
      data: unions,
      count: unions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching unions',
      error: error.message
    });
  }
};
