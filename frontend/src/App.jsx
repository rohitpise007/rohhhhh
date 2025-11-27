// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./Routes/Home";
import SymptomForm from "./components/SymptomForm";
import SymptomChecker from "./Routes/SymptomChecker";

import Register from "./Routes/Register";
import Login from "./Routes/Login";

import DoctorsList from "./Routes/DoctorsList";

import PatientDashboard from "./Routes/PatientDashboard";
import DoctorDashboard from "./Routes/DoctorDashboard";
import BookAppointment from "./Routes/BookAppointment";


// ---- Protected Route ----
function PrivateRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ---- Main App Component ----
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/symptom" element={<SymptomForm />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />

        <Route path="/doctors" element={<DoctorsList />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Patient Dashboard */}
        <Route
          path="/patient"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor"
          element={
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        {/* Book Appointment */}
        <Route
          path="/book"
          element={
            <PrivateRoute role="patient">
              <BookAppointment />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}
