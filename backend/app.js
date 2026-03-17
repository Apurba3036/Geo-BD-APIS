const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const divisionRoutes = require('./routes/divisions');
const districtRoutes = require('./routes/districts');
const upazilaRoutes = require('./routes/upazilas');
const unionRoutes = require('./routes/unions');

const app = express();

// Security and performance middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://geo-bd-apis.vercel.app',
    'https://geo-bd-apis.onrender.com'
  ],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());

// Routes
app.use('/api/divisions', divisionRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/upazilas', upazilaRoutes);
app.use('/api/unions', unionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'GeoBD API is running (JSON Fallback Mode)',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 GeoBD API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Using JSON fallback mode (no MongoDB)`);
});

module.exports = app;
