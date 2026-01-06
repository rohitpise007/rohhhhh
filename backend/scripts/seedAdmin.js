const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medapp');

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'Admin123@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log(`Email: ${adminEmail}`);
      process.exit(0);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    const admin = new Admin({
      name: 'System Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      permissions: [
        'manage_users',
        'manage_doctors',
        'manage_appointments',
        'view_reports',
        'system_settings'
      ],
      isActive: true
    });

    await admin.save();

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
