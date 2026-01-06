const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only for non-Google users
    },
    minlength: 6
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  },
  profile: {
    type: Object,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Google OAuth fields
  googleId: {
    type: String,
    sparse: true, // Allows multiple null values but ensures uniqueness when present
    unique: true
  },
  picture: {
    type: String,
    trim: true
  },
  refreshToken: {
    type: String,
    trim: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
