const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    console.log('🌱 Starting MongoDB database seeding...');
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const database = client.db('bdapis');
    
    // Read JSON files
    const divisionsData = JSON.parse(await fs.readFile('./divisions.json', 'utf8'));
    const districtsData = JSON.parse(await fs.readFile('./districts.json', 'utf8'));
    const upazilasData = JSON.parse(await fs.readFile('./upazilas.json', 'utf8'));
    
    // Clear existing data
    await database.collection('divisions').deleteMany({});
    await database.collection('districts').deleteMany({});
    await database.collection('upazilas').deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Insert data
    const divisions = await database.collection('divisions').insertMany(divisionsData);
    const districts = await database.collection('districts').insertMany(districtsData);
    const upazilas = await database.collection('upazilas').insertMany(upazilasData);
    
    console.log(`✅ Inserted ${divisions.insertedCount} divisions`);
    console.log(`✅ Inserted ${districts.insertedCount} districts`);
    console.log(`✅ Inserted ${upazilas.insertedCount} upazilas`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary: ${divisions.insertedCount} divisions, ${districts.insertedCount} districts, ${upazilas.insertedCount} upazilas`);
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();
