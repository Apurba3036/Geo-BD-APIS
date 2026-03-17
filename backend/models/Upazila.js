const mongoose = require('mongoose');

const upazilaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  district_id: {
    type: String,
    required: true,
    ref: 'District'
  },
  name: {
    type: String,
    required: true
  },
  bn_name: {
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

upazilaSchema.virtual('district', {
  ref: 'District',
  localField: 'district_id',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('Upazila', upazilaSchema);
