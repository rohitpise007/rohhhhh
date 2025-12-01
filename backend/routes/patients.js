//unusefull route
const express = require('express');
const patientController_controllers = require("../controllers/patientController");
const auth_middleware = require('../middleware/auth');


const patient_router = express.Router();

patient_router.post("/Create-appointment",auth_middleware,patientController_controllers.create_appointments);

module.exports = patient_router;
