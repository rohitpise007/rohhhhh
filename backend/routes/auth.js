require('dotenv').config();
const express = require('express');
const auth_Controller =require('../controllers/authController')
const auth_router = express.Router();


auth_router.post("/Pregister",auth_Controller.patient_register);
auth_router.post("/Plogin",auth_Controller.patient_login);
auth_router.get("/Plogin",auth_Controller.get_current_patient);
auth_router.get("/Plogout",auth_Controller.Plogout);
auth_router.post("/Dregister", auth_Controller.Doctor_register);
auth_router.post("/Dlogin", auth_Controller.Doctor_login);
auth_router.post("/Alogin", auth_Controller.Admin_login);
auth_router.get("/Alogin", auth_Controller.get_current_admin);
auth_router.get("/Alogout",auth_Controller.Plogout);
auth_router.get("/Alogout", auth_Controller.Admin_logout);

// Google OAuth routes
auth_router.post("/google/login", auth_Controller.google_login);
auth_router.post("/google/callback", auth_Controller.google_callback);
auth_router.post("/google/refresh", auth_Controller.google_refresh);
auth_router.post("/google/logout", auth_Controller.google_logout);
auth_router.get("/google/user", auth_Controller.get_current_google_user);

module.exports = auth_router;
