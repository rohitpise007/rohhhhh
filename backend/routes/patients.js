const express = require('express');
const patientController = require("../controllers/patientController");
const auth_middleware = require('../middleware/auth');

const patient_router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/reports/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'report-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!'));
    }
  }
});

patient_router.post("/Create-appointment", auth_middleware, patientController.create_appointments);
patient_router.get("/patient-appointments", auth_middleware, patientController.get_patient_appointments);
patient_router.get("/patient-reports", auth_middleware, patientController.get_patient_reports);
patient_router.post("/upload-report", auth_middleware, upload.single('report'), patientController.upload_report);
patient_router.get("/insurance-companies", patientController.get_insurance_companies);
patient_router.post("/apply-insurance", auth_middleware, patientController.apply_insurance);
patient_router.get("/patient-insurance-applications", auth_middleware, patientController.get_patient_insurance_applications);
patient_router.get("/patient-bills", auth_middleware, patientController.get_patient_bills);
patient_router.post("/pay-bill", auth_middleware, patientController.pay_bill);

module.exports = patient_router;
