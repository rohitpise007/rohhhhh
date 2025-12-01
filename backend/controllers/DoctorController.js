const jwt =require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Appointment =require("../models/Appointment");



const all_appointments = async (req, res) => {
  try {
    const userId = req.userId;
    const userAppointments = await Appointment.find({ user: userId }).populate("doctor");
    return res.json({ appointments: userAppointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const single_appointments = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate("doctor").populate("user");
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found" });
    }
    return res.json({ appointment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports={
    single_appointments, all_appointments
}