const mongoose = require('mongoose');
const Division = require('../models/Division');
const District = require('../models/District');
const Upazila = require('../models/Upazila');
const fs = require('fs').promises;
const path = require('path');

require('dotenv').config();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Division.deleteMany({});
    await District.deleteMany({});
    await Upazila.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Read JSON files
    const divisionsData = JSON.parse(await fs.readFile(path.join(__dirname, '../divisions.json'), 'utf8'));
    const districtsData = JSON.parse(await fs.readFile(path.join(__dirname, '../districts.json'), 'utf8'));
    const upazilasData = JSON.parse(await fs.readFile(path.join(__dirname, '../upazilas.json'), 'utf8'));

    // Insert divisions
    const divisions = await Division.insertMany(divisionsData);
    console.log(`✅ Inserted ${divisions.length} divisions`);

    // Insert districts
    const districts = await District.insertMany(districtsData);
    console.log(`✅ Inserted ${districts.length} districts`);

    // Insert upazilas
    const upazilas = await Upazila.insertMany(upazilasData);
    console.log(`✅ Inserted ${upazilas.length} upazilas`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary: ${divisions.length} divisions, ${districts.length} districts, ${upazilas.length} upazilas`);
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Connect and seed
const mongoUri = process.env.MONGODB_URI.includes('?') 
  ? process.env.MONGODB_URI.replace('?', 'bdapis?')
  : process.env.MONGODB_URI + 'bdapis';

mongoose.connect(mongoUri || 'mongodb://localhost:27017/geobd-api')
  .then(() => {
    console.log('✅ Connected to MongoDB for seeding');
    seedDatabase();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
