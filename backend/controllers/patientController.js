const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

const create_appointments = async (req, res) => {
  try {

    const { doctor, disease, about } = req.body;

    if (!doctor || !disease) {
      return res.status(400).json({ message: "Incomplete content" });
    }

    // userId comes from auth middleware after verifying patient token
    const userId = req.userId;

    const newAppointment = await Appointment.create({
      user: userId,
      doctor,   // doctor ObjectId from req.body
      disease,
      about
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {create_appointments}