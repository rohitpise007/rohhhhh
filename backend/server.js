require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const patient_router = require("./routes/patients");
const auth_router=require("./routes/auth");
const Doctor_router=require("./routes/doctors");
const admin_router=require("./routes/admin");
const disease_router=require("./routes/disease");
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(express.json());            // required to parse JSON bodie

app.use(express.urlencoded({ extended: true }));



// ---------- CORS ----------
app.use(
  cors({
    origin: true, // Allow all origins for development
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);
// ---------- Connect MongoDB ----------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medapp';
connectDB(MONGO_URI);

// ---------- API ROUTES ----------

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Hospital Management System Backend is running!', status: 'OK' });
});

app.use(auth_router);
app.use(patient_router);
app.use(Doctor_router);
app.use(admin_router);
app.use("/api/disease", disease_router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
