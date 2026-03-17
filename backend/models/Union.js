const mongoose = require('mongoose');

const unionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  upazila_id: {
    type: String,
    required: true,
    ref: 'Upazila'
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

unionSchema.virtual('upazila', {
  ref: 'Upazila',
  localField: 'upazila_id',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('Union', unionSchema);
