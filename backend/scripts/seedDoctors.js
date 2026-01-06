// usage: npm run seed:doctors
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');
const connectDB = require('../config/db');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medapp';
connectDB(MONGO_URI).then(async () => {
  try {
    const doctors = [
      { name: 'Dr. A Sharma', email: 'asharma@example.com', password: 'password123', specialty: 'Pulmonologist, Respiratory Medicine', bio: 'Chest infections, asthma, COPD', experience: 8 },
      { name: 'Dr. B Kapoor', email: 'bkapoor@example.com', password: 'password123', specialty: 'Cardiologist', bio: 'Cardiac care and angina', experience: 12 },
      { name: 'Dr. C Mehta', email: 'cmehta@example.com', password: 'password123', specialty: 'Gastroenterologist', bio: 'Liver, gastritis, ulcers', experience: 10 },
      { name: 'Dr. D Singh', email: 'dsingh@example.com', password: 'password123', specialty: 'Urologist, Nephrologist', bio: 'Kidney stones and UTIs', experience: 15 },
      { name: 'Dr. E Rao', email: 'erao@example.com', password: 'password123', specialty: 'Neurologist', bio: 'Headache, stroke, seizures', experience: 9 },
      { name: 'Dr. F Gupta', email: 'fgupta@example.com', password: 'password123', specialty: 'Dermatologist', bio: 'Skin, acne, rashes', experience: 7 }
    ];

    for (const d of doctors) {
      const exists = await Doctor.findOne({ email: d.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(d.password, 10);
        const doctor = new Doctor({
          ...d,
          password: hashedPassword
        });
        await doctor.save();
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
