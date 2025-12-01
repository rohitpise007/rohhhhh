const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      // Note: mongoose v7+ doesn't require useNewUrlParser/useUnifiedTopology options
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connect error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
