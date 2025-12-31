const jwt =require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Appointment =require("../models/Appointment");
const Report = require('../models/Report');



const all_appointments = async (req, res) => {
  try {
    const doctorId = req.userId;
    const doctorAppointments = await Appointment.find({ doctor: doctorId }).populate("user", "name email phone");
    return res.json({ appointments: doctorAppointments });
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

const get_doctor_reports = async (req, res) => {
  try {
    const doctorId = req.userId;

    // Get reports that are either:
    // 1. Directly assigned to this doctor (doctorId field)
    // 2. From patients who have appointments with this doctor
    const reports = await Report.find({
      $or: [
        { doctorId: doctorId }, // Reports directly assigned to this doctor
        {
          $and: [
            { doctorId: { $exists: false } }, // Reports not assigned to any specific doctor
            { patientId: { $in: (await Appointment.find({ doctor: doctorId })).map(apt => apt.user) } } // From patients with appointments
          ]
        }
      ]
    })
    .populate('patientId', 'name email phone')
    .sort({ uploadDate: -1 });

    return res.status(200).json({
      message: "Reports retrieved successfully",
      reports: reports,
      totalReports: reports.length
    });
  } catch (error) {
    console.error('Error fetching doctor reports:', error);
    return res.status(500).json({ message: error.message });
  }
};

const get_appointment_reports = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const doctorId = req.userId;

    // Verify the appointment belongs to this doctor
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctor: doctorId
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found or access denied" });
    }

    // Get reports for the patient of this appointment
    const reports = await Report.find({
      patientId: appointment.user
    })
    .populate('patientId', 'name email')
    .sort({ uploadDate: -1 });

    return res.status(200).json({
      message: "Appointment reports retrieved successfully",
      reports: reports,
      appointment: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment reports:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports={
    single_appointments,
    all_appointments,
    get_doctor_reports,
    get_appointment_reports
}