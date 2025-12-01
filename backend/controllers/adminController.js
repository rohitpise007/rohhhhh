const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const upload = require('../middleware/upload');


const Doctor_register = async function(req, res){
     try {
    const { name, email, password, phone, experience,image } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    // check if doctor already exists
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Doctor already exists' });

    // hash password
    const hashed = await bcrypt.hash(password, 10);
    const imageFilename = req.file ? req.file.filename : null;
    // create doctor
    const doctor = new Doctor({
      name,
      email,
      password: hashed,
      phone,
      experience,
      image:imageFilename,
    });

     return res.status(201).json({
      msg: 'Doctor registered successfully',
      doctorId: doctor._id,
      imageUrl: req.file ? `/uploads/doctors/${req.file.filename}` : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const all_doctors = async (req, res) => {
  try {
    const userId = req.userId;
    const doctors = await Doctor.find({ user: userId });
    return res.json({ doctor: doctors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const get_doctor_by_id = async (req, res) => {
//   try {
//     const userId = req.userId; // doctor id from URL

//     // Find doctor by ID
//     const doctor = await Doctor.findById(id);

//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     return res.status(200).json({ doctor });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const delete_doctor = async (req, res) => {
  try {
    const { id } = req.params; // doctor id from URL

    // check if doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    await Doctor.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


module.exports={
    Doctor_register, all_doctors, delete_doctor};