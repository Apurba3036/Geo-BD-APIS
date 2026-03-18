const fs = require('fs').promises;
const path = require('path');

let divisionsCache = null;
let districtsCache = null;
let upazilasCache = null;
let unionsCache = null;
let giProductsCache = null;

async function loadData() {
  if (!divisionsCache) {
    try {
      const divisionsData = JSON.parse(await fs.readFile(path.join(__dirname, '../divisions.json'), 'utf8'));
      const districtsData = JSON.parse(await fs.readFile(path.join(__dirname, '../districts.json'), 'utf8'));
      const upazilasData = JSON.parse(await fs.readFile(path.join(__dirname, '../upazilas.json'), 'utf8'));
      const unionsData = JSON.parse(await fs.readFile(path.join(__dirname, '../unions.json'), 'utf8'));
      const giProductsData = JSON.parse(await fs.readFile(path.join(__dirname, '../giproduct.json'), 'utf8'));
      
      divisionsCache = divisionsData;
      districtsCache = districtsData;
      upazilasCache = upazilasData;
      unionsCache = unionsData;
      giProductsCache = giProductsData.gi_products_bangladesh || [];
      
      console.log('✅ Loaded data from JSON files');
    } catch (error) {
      console.error('❌ Error loading data:', error);
    }
  }
}

exports.getAllDivisions = async (req, res) => {
  await loadData();
  res.json({
    success: true,
    data: divisionsCache || [],
    count: divisionsCache?.length || 0
  });
};

exports.getDivisionById = async (req, res) => {
  await loadData();
  const division = divisionsCache?.find(d => d.id === req.params.id);
  
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
};

exports.getAllDistricts = async (req, res) => {
  await loadData();
  const { division_id } = req.query;
  let filteredDistricts = districtsCache || [];
  
  if (division_id) {
    filteredDistricts = districtsCache?.filter(d => d.division_id === division_id) || [];
  }
  
  res.json({
    success: true,
    data: filteredDistricts,
    count: filteredDistricts.length
  });
};

exports.getDistrictById = async (req, res) => {
  await loadData();
  const district = districtsCache?.find(d => d.id === req.params.id);
  
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
};

exports.searchDistricts = async (req, res) => {
  await loadData();
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const results = districtsCache?.filter(d => 
    d.name.toLowerCase().includes(q.toLowerCase()) ||
    d.bn_name.includes(q)
  ).slice(0, 10) || [];
  
  res.json({
    success: true,
    data: results,
    count: results.length
  });
};

exports.getAllUpazilas = async (req, res) => {
  await loadData();
  const { district_id } = req.query;
  let filteredUpazilas = upazilasCache || [];
  
  if (district_id) {
    filteredUpazilas = upazilasCache?.filter(u => u.district_id === district_id) || [];
  }
  
  res.json({
    success: true,
    data: filteredUpazilas,
    count: filteredUpazilas.length
  });
};

exports.getUpazilaById = async (req, res) => {
  await loadData();
  const upazila = upazilasCache?.find(u => u.id === req.params.id);
  
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
};

exports.searchUpazilas = async (req, res) => {
  await loadData();
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const results = upazilasCache?.filter(u => 
    u.name.toLowerCase().includes(q.toLowerCase()) ||
    u.bn_name.includes(q)
  ).slice(0, 20) || [];
  
  res.json({
    success: true,
    data: results,
    count: results.length
  });
};

// Unions
exports.getAllUnions = async (req, res) => {
  await loadData();
  const { upazila_id } = req.query;
  let filteredUnions = unionsCache || [];
  
  if (upazila_id) {
    filteredUnions = unionsCache?.filter(u => u.upazila_id === upazila_id) || [];
  }
  
  res.json({
    success: true,
    data: filteredUnions,
    count: filteredUnions.length
  });
};

exports.getUnionById = async (req, res) => {
  await loadData();
  const union = unionsCache?.find(u => u.id === req.params.id);
  
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
};

exports.searchUnions = async (req, res) => {
  await loadData();
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const results = unionsCache?.filter(u => 
    u.name.toLowerCase().includes(q.toLowerCase()) ||
    u.bn_name.includes(q)
  ).slice(0, 30) || [];
  
  res.json({
    success: true,
    data: results,
    count: results.length
  });
};

// GI Products
exports.getAllGiProducts = async (req, res) => {
  await loadData();
  const { category, origin } = req.query;
  let filteredProducts = giProductsCache || [];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (origin) {
    filteredProducts = filteredProducts.filter(p => p.origin.toLowerCase().includes(origin.toLowerCase()));
  }
  
  res.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length
  });
};

exports.getGiProductById = async (req, res) => {
  await loadData();
  const product = giProductsCache?.find(p => p.application_no === req.params.id || p.sl_no.toString() === req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'GI Product not found'
    });
  }

  res.json({
    success: true,
    data: product
  });
};

exports.searchGiProducts = async (req, res) => {
  await loadData();
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const results = giProductsCache?.filter(p => 
    p.gi_product_name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.origin.toLowerCase().includes(q.toLowerCase())
  ) || [];
  
  res.json({
    success: true,
    data: results,
    count: results.length
  });
};
