// usage: npm run seed:doctors
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medapp';
connectDB(MONGO_URI).then(async () => {
  try {
    const doctors = [
      { name: 'Dr. A Sharma', email: 'asharma@example.com', password: 'password123', role: 'doctor', specialization: 'Pulmonologist, Respiratory Medicine', bio: 'Chest infections, asthma, COPD' },
      { name: 'Dr. B Kapoor', email: 'bkapoor@example.com', password: 'password123', role: 'doctor', specialization: 'Cardiologist', bio: 'Cardiac care and angina' },
      { name: 'Dr. C Mehta', email: 'cmehta@example.com', password: 'password123', role: 'doctor', specialization: 'Gastroenterologist', bio: 'Liver, gastritis, ulcers' },
      { name: 'Dr. D Singh', email: 'dsingh@example.com', password: 'password123', role: 'doctor', specialization: 'Urologist, Nephrologist', bio: 'Kidney stones and UTIs' },
      { name: 'Dr. E Rao', email: 'erao@example.com', password: 'password123', role: 'doctor', specialization: 'Neurologist', bio: 'Headache, stroke, seizures' },
      { name: 'Dr. F Gupta', email: 'fgupta@example.com', password: 'password123', role: 'doctor', specialization: 'Dermatologist', bio: 'Skin, acne, rashes' }
    ];

    for (const d of doctors) {
      const exists = await User.findOne({ email: d.email });
      if (!exists) {
        const u = new User(d);
        await u.save();
        console.log('Created doctor', d.email);
      } else {
        console.log('Doctor exists', d.email);
      }
    }
  } catch (err) {
    console.error('seed error', err);
  } finally {
    mongoose.disconnect();
  }
});
