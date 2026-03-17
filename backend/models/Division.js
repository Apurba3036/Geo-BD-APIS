const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
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

divisionSchema.virtual('districts', {
  ref: 'District',
  localField: 'id',
  foreignField: 'division_id'
});

module.exports = mongoose.model('Division', divisionSchema);
