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

module.exports = auth_router;
