import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import DoctorAppointments from "./Pages/DoctorAppointments";
import PatientDashboard from "./Pages/PatientDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import OPDModule from "./Pages/OPDModule";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import { API_BASE_URL } from "./config";
import Login from "./Pages/Login";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user, userRole } = useContext(Context);

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    console.log("ProtectedRoute check - isAuthenticated:", isAuthenticated, "userRole:", userRole, "allowedRoles:", allowedRoles);

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      console.log("Role not allowed for userRole:", userRole, "allowedRoles:", allowedRoles);
      // Redirect to appropriate dashboard based on role
      if (userRole === 'doctor') {
        return <Navigate to="/Viewall-appointment" />;
      } else if (userRole === 'admin') {
        return <Navigate to="/admin-dashboard" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }

    console.log("Access granted to protected route");
    return children;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to get current user from different endpoints based on cookies
        // First try patient endpoint
        try {
          const response = await axios.get(
            `${API_BASE_URL}/Plogin`,
            { withCredentials: true }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
          return;
        } catch (patientError) {
          // If patient endpoint fails, try admin endpoint
        try {
          const response = await axios.get(
            `${API_BASE_URL}/Alogin`,
            { withCredentials: true }
          );
          setIsAuthenticated(true);
          setUser({ ...response.data.user, role: 'admin' });
          return;
        } catch (adminError) {
            setIsAuthenticated(false);
            setUser({});
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute allowedRoles={['patient']}><Appointment /></ProtectedRoute>} />
          <Route path="/opd-module" element={<OPDModule />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/Viewall-appointment" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAppointments /></ProtectedRoute>} />
        </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
