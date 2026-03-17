const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('bdapis');
  }
  return db;
}

// Divisions
exports.getAllDivisions = async (req, res) => {
  try {
    const database = await connectDB();
    const divisions = await database.collection('divisions').find({}).toArray();
    
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
    const database = await connectDB();
    const division = await database.collection('divisions').findOne({ id: req.params.id });
    
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

// Districts
exports.getAllDistricts = async (req, res) => {
  try {
    const database = await connectDB();
    const { division_id } = req.query;
    let query = {};
    
    if (division_id) {
      query.division_id = division_id;
    }
    
    const districts = await database.collection('districts').find(query).toArray();
    
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
    const database = await connectDB();
    const district = await database.collection('districts').findOne({ id: req.params.id });
    
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
    const database = await connectDB();
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const districts = await database.collection('districts').find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bn_name: { $regex: q, $options: 'i' } }
      ]
    }).limit(10).toArray();
    
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

// Upazilas
exports.getAllUpazilas = async (req, res) => {
  try {
    const database = await connectDB();
    const { district_id } = req.query;
    let query = {};
    
    if (district_id) {
      query.district_id = district_id;
    }
    
    const upazilas = await database.collection('upazilas').find(query).toArray();
    
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
    const database = await connectDB();
    const upazila = await database.collection('upazilas').findOne({ id: req.params.id });
    
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
    const database = await connectDB();
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const upazilas = await database.collection('upazilas').find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bn_name: { $regex: q, $options: 'i' } }
      ]
    }).limit(20).toArray();
    
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
