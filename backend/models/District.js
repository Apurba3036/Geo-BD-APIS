const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  division_id: {
    type: String,
    required: true,
    ref: 'Division'
  },
  name: {
    type: String,
    required: true
  },
  bn_name: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

districtSchema.virtual('upazilas', {
  ref: 'Upazila',
  localField: 'id',
  foreignField: 'district_id'
});

districtSchema.virtual('division', {
  ref: 'Division',
  localField: 'division_id',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('District', districtSchema);
