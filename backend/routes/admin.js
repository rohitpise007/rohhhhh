const express = require('express');
const role = require('../middleware/role');
const Appointment = require('../models/Appointment');
const auth_middleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const admin_contoller=require("../controllers/adminController");
const admin_router = express.Router();

admin_router.get("/admin", role, upload.single('image'), admin_contoller.Doctor_register);
admin_router.get("/viewAll-doctors", admin_contoller.all_doctors);
// admin_router.get("/view-doctors /:id", admin_contoller.get_doctor_by_id);
admin_router.post("/delete-doctor/:id", admin_contoller.delete_doctor);


module.exports = admin_router;
