const express = require('express');
const apointmentMngmiddl = require('../middleware/apointmentMngmiddl');
const controller=require("../controllers/DoctorController")
const Doctorrouter = express.Router();

Doctorrouter.get("/single-appointment/:id",apointmentMngmiddl,controller.single_appointments);
Doctorrouter.get("/Viewall-appointment",apointmentMngmiddl,controller.all_appointments);
module.exports = Doctorrouter;
