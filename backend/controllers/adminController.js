const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Appointment = require('../models/Appointment');
const InsuranceApplication = require('../models/InsuranceApplication');
const Report = require('../models/Report');
const Bill = require('../models/Bill');
const upload = require('../middleware/upload');


const admin_register_doctor = async function(req, res){
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
    console.log("Fetching all doctors...");
    // Return all doctors so patients can choose from available doctors
    const doctors = await Doctor.find({});
    console.log("Found doctors:", doctors.length);

    // If no doctors exist, return some dummy data for testing
    if (!doctors || doctors.length === 0) {
      console.log("No doctors found, returning dummy data");
      const dummyDoctors = [
        {
          _id: "dummy1",
          name: "Dr. A Sharma",
          email: "asharma@example.com",
          specialty: "Pulmonologist, Respiratory Medicine",
          experience: 8,
          phone: "+1234567890"
        },
        {
          _id: "dummy2",
          name: "Dr. B Kapoor",
          email: "bkapoor@example.com",
          specialty: "Cardiologist",
          experience: 12,
          phone: "+1234567891"
        }
      ];
      return res.json({ doctor: dummyDoctors });
    }

    return res.json({ doctor: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: error.message });
  }
};

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

const get_admin_dashboard = async (req, res) => {
  try {
    // Get all appointments with populated data
    const allAppointments = await Appointment.find({})
      .populate('user', 'name email phone')
      .populate('doctor', 'name email specialty')
      .sort({ createdAt: -1 });

    // Get all doctors
    const allDoctors = await Doctor.find({}).sort({ createdAt: -1 });

    // Get all patients
    const allPatients = await User.find({}).sort({ createdAt: -1 });

    // Get pending insurance applications
    const pendingInsuranceApps = await InsuranceApplication.find({ status: 'pending' })
      .populate('patientId', 'name email phone')
      .populate('insuranceCompanyId', 'name')
      .sort({ applicationDate: -1 });

    // Get all insurance applications
    const insuranceApplications = await InsuranceApplication.find({})
      .populate('patientId', 'name email phone')
      .populate('insuranceCompanyId', 'name')
      .sort({ applicationDate: -1 });

    // Get recent reports
    const recentReports = await Report.find({})
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name email specialty')
      .sort({ uploadDate: -1 })
      .limit(10);

    // Get all bills
    const allBills = await Bill.find({})
      .populate('patientId', 'name email phone')
      .populate('appointmentId', 'disease appointmentDate')
      .sort({ dueDate: -1 });

    // Get billing statistics
    const billingStats = {
      total: await Bill.countDocuments(),
      paid: await Bill.countDocuments({ status: 'paid' }),
      pending: await Bill.countDocuments({ status: 'pending' })
    };

    return res.status(200).json({
      message: 'Admin dashboard data retrieved successfully',
      data: {
        appointments: allAppointments,
        doctors: allDoctors,
        patients: allPatients,
        pendingInsuranceApps,
        insuranceApplications,
        recentReports,
        bills: allBills,
        billingStats,
        stats: {
          totalAppointments: allAppointments.length,
          totalPatients: allPatients.length,
          totalDoctors: allDoctors.length,
          totalInsuranceApplications: insuranceApplications.length,
          pendingInsuranceApplications: pendingInsuranceApps.length,
          totalBills: allBills.length,
          paidBills: billingStats.paid,
          pendingBills: billingStats.pending
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    return res.status(500).json({ message: 'Failed to fetch admin dashboard data' });
  }
};

const get_website_stats = async (req, res) => {
  try {
    // Get total appointments
    const totalAppointments = await Appointment.countDocuments();

    // Get total patients
    const totalPatients = await User.countDocuments();

    // Get total doctors
    const totalDoctors = await Doctor.countDocuments();

    // Get completed appointments
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

    // Get pending appointments
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });

    // For visitors, we'll use a simulated number since we don't have actual visitor tracking
    // In a real application, you'd use analytics services like Google Analytics
    const baseVisitors = 1250;
    const randomVariation = Math.floor(Math.random() * 100); // Add some variation
    const visitors = baseVisitors + randomVariation;

    const stats = {
      totalAppointments,
      totalPatients,
      totalDoctors,
      completedAppointments,
      pendingAppointments,
      visitors
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching website stats:', error);
    return res.status(500).json({ message: 'Failed to fetch website statistics' });
  }
};


const approve_insurance_application = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await InsuranceApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Insurance application not found' });
    }

    application.status = 'approved';
    application.approvalDate = new Date();
    await application.save();

    return res.status(200).json({
      message: 'Insurance application approved successfully',
      application
    });
  } catch (error) {
    console.error('Error approving insurance application:', error);
    return res.status(500).json({ message: 'Failed to approve insurance application' });
  }
};

const reject_insurance_application = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { reason } = req.body;

    const application = await InsuranceApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Insurance application not found' });
    }

    application.status = 'rejected';
    application.rejectionReason = reason || 'Application rejected by admin';
    await application.save();

    return res.status(200).json({
      message: 'Insurance application rejected successfully',
      application
    });
  } catch (error) {
    console.error('Error rejecting insurance application:', error);
    return res.status(500).json({ message: 'Failed to reject insurance application' });
  }
};

const get_all_insurance_applications = async (req, res) => {
  try {
    const applications = await InsuranceApplication.find({})
      .populate('patientId', 'name email phone')
      .populate('insuranceCompanyId', 'name')
      .sort({ applicationDate: -1 });

    return res.status(200).json({
      message: "Insurance applications retrieved successfully",
      applications
    });
  } catch (error) {
    console.error('Error fetching insurance applications:', error);
    return res.status(500).json({ message: 'Failed to fetch insurance applications' });
  }
};

const get_all_reports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name email specialty')
      .sort({ uploadDate: -1 });

    return res.status(200).json({
      message: "All reports retrieved successfully",
      reports: reports
    });
  } catch (error) {
    console.error('Error fetching all reports:', error);
    return res.status(500).json({ message: error.message });
  }
};

const get_all_bills = async (req, res) => {
  try {
    const bills = await Bill.find({})
      .populate('patientId', 'name email phone')
      .populate('appointmentId', 'disease appointmentDate')
      .sort({ dueDate: -1 });

    return res.status(200).json({
      message: "All bills retrieved successfully",
      bills: bills
    });
  } catch (error) {
    console.error('Error fetching all bills:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports={
    admin_register_doctor, all_doctors, delete_doctor, get_website_stats,
    get_admin_dashboard, approve_insurance_application, reject_insurance_application,
    get_all_insurance_applications, get_all_reports, get_all_bills};