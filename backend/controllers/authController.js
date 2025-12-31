const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');

const patient_register =async function(req,res){
    try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, phone });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

const patient_login =async function(req, res){
     try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', { expiresIn: '7d' });

    res.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Required for cross-domain
      sameSite: 'none', // Required for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

  // Get current authenticated patient using cookie token
  const get_current_patient = async (req, res) => {
    try {
      const token = req.cookies.authorization?.replace('Bearer ', '') || req.headers.authorization?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ message: 'Not authenticated' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json({ user });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

const Plogout = (req, res) =>{
  res
    .clearCookie("authorization", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Logout successful" });

}

// Get current authenticated admin using cookie token
const get_current_admin = async (req, res) => {
  try {
    const token = req.cookies.authorization?.replace('Bearer ', '') || req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    return res.json({ user: admin });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
const Doctor_login = async function(req, res) {
  try {
      const { email, password } = req.body;
    console.log(email, password);

      if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const auth_user = await Doctor.findOne({ email });
          console.log(auth_user);

          if (!auth_user) {
      return res.status(401).json({ message: `User with ${email} not found` });
    }

              const verify = await bcrypt.compare(password, auth_user.password);
    if (!verify) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

                    const token = jwt.sign(
      { id: auth_user._id, role: 'doctor' },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
                    );

    res.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Required for cross-domain
      sameSite: 'none', // Required for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      message: 'Doctor login successful',
      token: `Bearer ${token}`,
      user: {
        id: auth_user._id,
        name: auth_user.name,
        email: auth_user.email,
        phone: auth_user.phone,
        specialty: auth_user.specialty,
        experience: auth_user.experience,
        role: auth_user.role
      }
    });
  } catch (error) {
    console.error('Doctor login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const Doctor_register = async function (req, res) {
  try {
    const { name, email, password, specialty, experience, phone } = req.body;
    if (!name || !email || !password || !specialty) {
      return res.status(400).json({ message: 'Missing fields for doctor registration' });
    }

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Doctor already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ name, email, password: hashed, specialty, experience, phone });
    await doctor.save();

    const token = jwt.sign({ id: doctor._id, role: doctor.role }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', { expiresIn: '7d' });

    res.status(201).json({
      message: 'Doctor registered successfully',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialty: doctor.specialty,
        experience: doctor.experience,
        role: doctor.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const Admin_login = async function(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if any admin exists, if not, create default admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin users found, creating default admin...');
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      const defaultAdmin = new Admin({
        name: 'System Administrator',
        email: 'Admin123@gmail.com',
        password: hashedPassword,
        role: 'admin',
        permissions: ['manage_users', 'manage_doctors', 'manage_appointments', 'view_reports'],
        isActive: true
      });
      await defaultAdmin.save();
      console.log('Default admin created: Admin123@gmail.com / Admin123');
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role, is_admin: true },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
    );

    res.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Required for cross-domain
      sameSite: 'none', // Required for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const Admin_logout = (req, res) => {
  res
    .clearCookie("authorization", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Admin logout successful" });
};

module.exports = { patient_register, patient_login, get_current_patient, Doctor_register, Doctor_login, Admin_login, get_current_admin, Admin_logout, Plogout };