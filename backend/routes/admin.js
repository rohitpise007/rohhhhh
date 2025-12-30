const express = require('express');
const role = require('../middleware/role');
const Appointment = require('../models/Appointment');
const auth_middleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const admin_contoller=require("../controllers/adminController");
const admin_router = express.Router();

admin_router.post("/register-doctor", role, upload.single('image'), admin_contoller.admin_register_doctor);
admin_router.get("/viewAll-doctors", admin_contoller.all_doctors);
admin_router.get("/website-stats", admin_contoller.get_website_stats);
admin_router.post("/delete-doctor/:id", admin_contoller.delete_doctor);

// Admin dashboard routes
admin_router.get("/admin-dashboard", auth_middleware, role, admin_contoller.get_admin_dashboard);
admin_router.get("/insurance-applications", auth_middleware, role, admin_contoller.get_all_insurance_applications);
admin_router.post("/insurance-applications/:applicationId/approve", auth_middleware, role, admin_contoller.approve_insurance_application);
admin_router.post("/insurance-applications/:applicationId/reject", auth_middleware, role, admin_contoller.reject_insurance_application);
admin_router.get("/all-reports", auth_middleware, role, admin_contoller.get_all_reports);
admin_router.get("/all-bills", auth_middleware, role, admin_contoller.get_all_bills);


module.exports = admin_router;
