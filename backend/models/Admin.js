const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  is_admin: {
      type: Boolean,
      default: false,
    },
  // profile: { type: Object },
  // createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', UserSchema);