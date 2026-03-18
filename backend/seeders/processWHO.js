const fs = require('fs');
const path = require('path');

const WHO_DATA_DIR = path.join(__dirname, '../WHO Data');
const OUTPUT_FILE = path.join(__dirname, '../who.json');

/**
 * Simple CSV parser for standard WHO format
 */
function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',');
  const results = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const entry = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index] ? values[index].trim() : null;
    });
    results.push(entry);
  }
  return results;
}

async function processWHOData() {
  console.log('🚀 Starting WHO Data processing...');
  
  const indicators = [];
  try {
    const folders = fs.readdirSync(WHO_DATA_DIR).filter(f => fs.statSync(path.join(WHO_DATA_DIR, f)).isDirectory());
    
    for (const folder of folders) {
      const folderPath = path.join(WHO_DATA_DIR, folder);
      const files = fs.readdirSync(folderPath);
      
      // Look for the main dataset file (contains "Dataset" in name)
      const datasetFile = files.find(f => f.includes('Dataset') && f.endsWith('.csv'));
      
      if (datasetFile) {
        console.log(`Processing: ${folder}`);
        const filePath = path.join(folderPath, datasetFile);
        const content = fs.readFileSync(filePath, 'utf8');
        const rows = parseCSV(content);
        
        if (rows.length > 0) {
          const firstRow = rows[0];
          const indicator = {
            uuid: firstRow.IND_UUID,
            name: firstRow.IND_NAME,
            data: {}
          };
          
          rows.forEach(row => {
            if (row.DIM_TIME && row.DIM_GEO_CODE_M49 === '050') { // 050 is Bangladesh
              // Find the primary value column (starts with RATE_ or VALUE_)
              const valueKey = Object.keys(row).find(key => key.startsWith('RATE_') || key.startsWith('VALUE_'));
              if (valueKey && row[valueKey]) {
                indicator.data[row.DIM_TIME] = parseFloat(row[valueKey]);
              }
            }
          });
          
          // Only add if we have data points
          if (Object.keys(indicator.data).length > 0) {
            indicators.push(indicator);
          }
        }
      }
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(indicators, null, 2));
    console.log(`✅ Success! Processed ${indicators.length} indicators.`);
    console.log(`📁 Saved to ${OUTPUT_FILE}`);
    
  } catch (err) {
    console.error('❌ Error processing WHO data:', err);
  }
}

processWHOData();
