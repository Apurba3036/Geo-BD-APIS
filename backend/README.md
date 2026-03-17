# GeoBD API Backend 🇧🇩

Bangladesh Geo API Platform Backend - Clean, fast, developer-first API for Bangladesh geographical data.

## 🚀 Features

- **RESTful API** for divisions, districts, and upazilas
- **MongoDB** with Mongoose ODM
- **Fast responses** with compression and rate limiting
- **Developer-friendly** error handling
- **Security** with Helmet.js
- **Search functionality** for districts and upazilas

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

## 🛠️ Setup

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

3. **Start MongoDB** (make sure it's running)

4. **Seed the database**
```bash
npm run seed
```

5. **Start the server**
```bash
npm run dev     # Development with nodemon
npm start      # Production
```

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
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/geobd-api
CORS_ORIGIN=http://localhost:3000
```

## 📝 License

MIT License - Free forever 🇧🇩
