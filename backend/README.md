# GeoBD API Backend 🇧🇩

Bangladesh Geo API Platform Backend - Clean, fast, developer-first API for Bangladesh geographical data using JSON files.

## 🚀 Features

- **RESTful API** for divisions, districts, upazilas, and unions
- **JSON-based Data** using files from [SudipMHX/bd-apis](https://github.com/SudipMHX/bd-apis.git)
- **Fast responses** with compression and rate limiting
- **Developer-friendly** error handling
- **Security** with Helmet.js
- **Search functionality** for all administrative levels and GI Products
- **No Database Required** - Uses JSON files with caching
- **Complete Coverage** - 8 divisions, 64 districts, 495+ upazilas, 4500+ unions, 30+ GI Products, 50+ World Bank Indicators, and 35+ WHO Health Indicators.

## 📡 API Endpoints

### Divisions
```
GET /api/divisions                    # Get all divisions
GET /api/divisions/:id                # Get division by ID
GET /api/divisions/:id/districts     # Get division with districts
```

### Districts
```
GET /api/districts                    # Get all districts
GET /api/districts?division_id=2      # Get districts by division
GET /api/districts/search?q=Pabna     # Search districts
GET /api/districts/:id                # Get district by ID
```

### Upazilas
```
GET /api/upazilas                     # Get all upazilas
GET /api/upazilas?district_id=13      # Get upazilas by district
GET /api/upazilas/search?q=Debidwar   # Search upazilas
GET /api/upazilas/:id                 # Get upazila by ID
```

### Unions
```
GET /api/unions                       # Get all unions
GET /api/unions?upazila_id=:id        # Get unions by upazila
GET /api/unions/:id                   # Get union by ID
GET /api/unions/search?q=:query       # Search unions
```

### Geographical Indications (GI)
```
GET /api/giproducts                   # Get all GI products
GET /api/giproducts/:id               # Get a GI product by application no
GET /api/giproducts/search?q=:query   # Search GI products by name or origin

### World Bank Indicators
```bash
GET /api/worldbank                    # Get all World Bank indicators
GET /api/worldbank/:code              # Get data for a specific indicator
```
```

## 📊 Data Source

**JSON Data Collected From:** [https://github.com/SudipMHX/bd-apis.git](https://github.com/SudipMHX/bd-apis.git)

### Data Files Used:
- `divisions.json` - 8 divisions of Bangladesh
- `districts.json` - 64 districts with coordinates
- `upazilas.json` - 495+ upazilas with district relationships
- `unions.json` - 4,500+ unions with upazila relationships
- `giproduct.json` - Full catalog of certified GI products of Bangladesh
- `worldbank.json` - Comprehensive WDI data for Bangladesh (1990-2025)

### Data Features:
- **Complete Coverage** - All administrative levels
- **Bengali Names** - Native language support
- **Coordinates** - Latitude and longitude for mapping
- **Official URLs** - Government website links
- **Hierarchical Structure** - Parent-child relationships

## 🛠️ Setup

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables** (optional)
```bash
cp .env.example .env
# Edit .env if needed (has default values)
```

3. **Start the server**
```bash
npm run dev     # Development with nodemon
npm start      # Production
```

**No database setup required!** The API uses JSON files with built-in caching.

## 📊 Example Response

```json
{
  "success": true,
  "data": {
    "id": "1",
    "division_id": "1",
    "name": "Comilla",
    "bn_name": "কুমিল্লা",
    "lat": "23.4682747",
    "lon": "91.1788135",
    "url": "www.comilla.gov.bd"
  }
}
```

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=production
# List of origins you can allow (Array syntax in app.js):
CORS_ORIGIN=https://geo-bd-apis.vercel.app
# MongoDB is NOT required - using JSON files
```

## 📁 Project Structure

```
backend/
├── controllers/
│   └── fallbackController.js    # JSON file controller
├── routes/
│   ├── divisions.js
│   ├── districts.js
│   ├── upazilas.js
│   └── unions.js
├── data/
│   ├── divisions.json
│   ├── districts.json
│   ├── upazilas.json
│   ├── unions.json
│   └── giproduct.json
├── app.js                       # Express app
└── package.json
```

## ⚡ Performance

- **Fast Loading** - JSON files cached in memory
- **No Database Latency** - Direct file access
- **Compression** - Gzip for API responses
- **Rate Limiting** - 100 requests per 15 minutes
- **Security Headers** - Helmet.js protection

## 🔄 Data Updates

To update the data from the source repository:

1. **Download latest data**
```bash
# Clone or pull from source
git clone https://github.com/SudipMHX/bd-apis.git temp-data
```

2. **Replace JSON files**
```bash
cp temp-data/divisions.json .
cp temp-data/districts.json .
cp temp-data/upazilas.json .
cp temp-data/unions.json .
```

3. **Restart server**
```bash
npm restart
```

## 📝 License

MIT License - Free forever 🇧🇩

## 🙏 Data Credits

**Special thanks to [SudipMHX/bd-apis](https://github.com/SudipMHX/bd-apis.git)** for providing the comprehensive Bangladesh geographical data in JSON format.
