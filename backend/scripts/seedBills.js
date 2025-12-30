const mongoose = require('mongoose');
const Bill = require('../models/Bill');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
require('dotenv').config();

const seedBills = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medapp');

    // Get all users
    const users = await User.find({});
    const appointments = await Appointment.find({});

    // Clear existing bills
    await Bill.deleteMany({});
    console.log('Cleared existing bills');

    const bills = [];

    // Create bills for each user
    for (const user of users) {
      const userAppointments = appointments.filter(apt => apt.user.toString() === user._id.toString());

      // Create 1-3 bills per user
      const numBills = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numBills; i++) {
        const appointment = userAppointments[i] || null;
        const billAmount = Math.floor(Math.random() * 500) + 50; // $50 - $550
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 1); // Due in 1-30 days

        const breakdown = [
          { item: 'Consultation Fee', cost: Math.floor(billAmount * 0.6), quantity: 1 },
          { item: 'Medical Tests', cost: Math.floor(billAmount * 0.3), quantity: 1 },
          { item: 'Medication', cost: Math.floor(billAmount * 0.1), quantity: 1 }
        ];

        const bill = {
          patientId: user._id,
          appointmentId: appointment ? appointment._id : null,
          description: appointment ? `Appointment: ${appointment.disease}` : `Medical Services - ${new Date().toLocaleDateString()}`,
          amount: billAmount,
          dueDate: dueDate,
          status: Math.random() > 0.7 ? 'paid' : 'pending', // 30% chance of being paid
          breakdown: breakdown,
          insuranceCovered: Math.floor(billAmount * 0.3), // 30% insurance coverage
          patientResponsibility: billAmount - Math.floor(billAmount * 0.3),
          notes: 'Standard medical billing for services rendered.'
        };

        bills.push(bill);
      }
    }

    // Insert bills
    await Bill.insertMany(bills);
    console.log(`Successfully seeded ${bills.length} bills`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding bills:', error);
    process.exit(1);
  }
};

seedBills();
