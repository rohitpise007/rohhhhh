const mongoose = require('mongoose');

const insuranceApplicationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  insuranceCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InsuranceCompany',
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  coverageType: {
    type: String,
    required: true
  },
  premiumAmount: {
    type: Number,
    required: true
  },
  policyNumber: {
    type: String
  },
  approvalDate: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  documents: [{
    filename: String,
    originalName: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    filePath: String
  }]
});

module.exports = mongoose.model('InsuranceApplication', insuranceApplicationSchema);
