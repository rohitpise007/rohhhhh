// Seed script for test patients
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectDB = require('../config/db');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medapp';

const seedPatients = async () => {
  try {
    await connectDB(MONGO_URI);

    const testPatients = [
      {
        name: 'Test Patient',
        email: 'patient@test.com',
        password: 'password123',
        phone: '1234567890',
        role: 'patient'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'patient'
      }
    ];

    for (const patientData of testPatients) {
      const exists = await User.findOne({ email: patientData.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(patientData.password, 10);
        const patient = new User({
          ...patientData,
          password: hashedPassword
        });
        await patient.save();
        console.log('Created patient:', patientData.email);
      } else {
        console.log('Patient already exists:', patientData.email);
      }
    }

    console.log('Patient seeding completed!');
  } catch (error) {
    console.error('Error seeding patients:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedPatients();
