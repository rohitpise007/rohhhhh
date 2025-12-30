const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Report = require("../models/Report");
const InsuranceCompany = require("../models/InsuranceCompany");
const InsuranceApplication = require("../models/InsuranceApplication");
const Bill = require("../models/Bill");

const create_appointments = async (req, res) => {
  try {
    const { doctor, disease, about, appointmentDate, appointmentTime } = req.body;

    if (!doctor || !disease || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "Incomplete content: doctor, disease, appointmentDate and appointmentTime are required" });
    }

    // userId comes from auth middleware after verifying patient token
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Convert appointmentDate to a Date object (expecting YYYY-MM-DD)
    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      console.log("Invalid date format:", appointmentDate);
      return res.status(400).json({ message: "Invalid appointmentDate format" });
    }

    // Basic validation for time (accept various formats)
    const timeRegex = /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
    if (!timeRegex.test(appointmentTime)) {
      console.log("Invalid time format:", appointmentTime);
      return res.status(400).json({ message: "Invalid appointmentTime format" });
    }

    const newAppointment = await Appointment.create({
      user: userId,
      doctor,
      disease,
      about,
      appointmentDate: parsedDate,
      appointmentTime
    });

    console.log("Appointment created successfully:", newAppointment);

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const get_patient_appointments = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await Appointment.find({ user: userId })
      .populate('doctor', 'name specialization')
      .sort({ appointmentDate: -1, appointmentTime: -1 });

    return res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments: appointments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const get_patient_reports = async (req, res) => {
  try {
    const userId = req.userId;

    const reports = await Report.find({ patientId: userId })
      .populate('doctorId', 'name specialization')
      .sort({ uploadDate: -1 });

    return res.status(200).json({
      message: "Reports retrieved successfully",
      reports: reports
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const upload_report = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.userId;
    const { reportType, description, doctorId, appointmentId } = req.body;

    // If appointmentId is provided, link the report to that appointment's doctor
    let linkedDoctorId = doctorId;
    if (appointmentId) {
      const appointment = await Appointment.findOne({ _id: appointmentId, user: userId });
      if (appointment) {
        linkedDoctorId = appointment.doctor;
      }
    }

    const newReport = new Report({
      patientId: userId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: Math.round(req.file.size / 1024), // Size in KB
      reportType: reportType || 'medical_report',
      filePath: req.file.path,
      description: description || '',
      doctorId: linkedDoctorId
    });

    await newReport.save();

    return res.status(201).json({
      message: 'Report uploaded successfully',
      report: newReport
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const get_insurance_companies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find({ isActive: true });

    return res.status(200).json({
      message: "Insurance companies retrieved successfully",
      companies: companies
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const apply_insurance = async (req, res) => {
  try {
    const { insuranceCompanyId, coverageType } = req.body;
    const patientId = req.userId;

    // Check if application already exists
    const existingApplication = await InsuranceApplication.findOne({
      patientId,
      insuranceCompanyId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Insurance application already exists' });
    }

    const company = await InsuranceCompany.findById(insuranceCompanyId);
    if (!company) {
      return res.status(404).json({ message: 'Insurance company not found' });
    }

    // Calculate premium based on coverage type and company pricing
    const premiumAmount = Math.floor(Math.random() * (company.premiumRange.max - company.premiumRange.min + 1)) + company.premiumRange.min;

    const application = new InsuranceApplication({
      patientId,
      insuranceCompanyId,
      coverageType: coverageType || 'medical',
      premiumAmount
    });

    await application.save();

    return res.status(201).json({
      message: 'Insurance application submitted successfully',
      application: application
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const get_patient_bills = async (req, res) => {
  try {
    const userId = req.userId;

    const bills = await Bill.find({ patientId: userId })
      .populate('appointmentId', 'disease appointmentDate')
      .sort({ dueDate: 1 });

    return res.status(200).json({
      message: "Bills retrieved successfully",
      bills: bills
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const get_patient_insurance_applications = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await InsuranceApplication.find({ patientId: userId })
      .populate('insuranceCompanyId', 'name')
      .sort({ applicationDate: -1 });

    return res.status(200).json({
      message: "Insurance applications retrieved successfully",
      applications: applications
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const pay_bill = async (req, res) => {
  try {
    const { billId } = req.body;
    const userId = req.userId;

    const bill = await Bill.findOne({ _id: billId, patientId: userId });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.status === 'paid') {
      return res.status(400).json({ message: 'Bill is already paid' });
    }

    // Update bill status
    bill.status = 'paid';
    bill.paymentDate = new Date();
    bill.paymentMethod = 'credit_card'; // In real app, this would come from payment gateway
    bill.transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    await bill.save();

    return res.status(200).json({
      message: 'Payment successful',
      bill: bill
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create_appointments,
  get_patient_appointments,
  get_patient_reports,
  upload_report,
  get_insurance_companies,
  apply_insurance,
  get_patient_insurance_applications,
  get_patient_bills,
  pay_bill
}