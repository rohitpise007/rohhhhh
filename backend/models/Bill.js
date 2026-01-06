const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash', 'insurance'],
    default: 'credit_card'
  },
  transactionId: {
    type: String
  },
  breakdown: [{
    item: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  insuranceCovered: {
    type: Number,
    default: 0
  },
  patientResponsibility: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Bill', billSchema);
