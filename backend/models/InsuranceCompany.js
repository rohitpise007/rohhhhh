const mongoose = require('mongoose');

const insuranceCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: [{
    type: String,
    required: true
  }],
  contactNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  coverageTypes: [{
    type: String,
    enum: ['medical', 'dental', 'vision', 'prescription', 'hospitalization', 'telemedicine'],
    default: ['medical']
  }],
  premiumRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InsuranceCompany', insuranceCompanySchema);
