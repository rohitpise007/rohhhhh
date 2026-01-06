const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  reportType: {
    type: String,
    enum: ['medical_report', 'lab_result', 'prescription', 'other'],
    default: 'medical_report'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  filePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }
});

module.exports = mongoose.model('Report', reportSchema);
