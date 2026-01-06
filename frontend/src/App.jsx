import React, { useContext, useEffect, useState } from "react";
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
import IPDModule from "./Pages/IPDModule";
import RadiologyModule from "./Pages/RadiologyModule";
import OTModule from "./Pages/OTModule";
import PathologyModule from "./Pages/PathologyModule";
import NursingStationModule from "./Pages/NursingStationModule";
import InventoryModule from "./Pages/InventoryModule";
import PharmacyModule from "./Pages/PharmacyModule";
import DiseasePrediction from "./Pages/DiseasePrediction";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
// Using direct backend URL instead of API_BASE_URL
import Login from "./Pages/Login";
import GoogleCallback from "./Pages/GoogleCallback";

const App = () => {
  console.log("🎯 App component rendering");
  const { isAuthenticated, setIsAuthenticated, setUser, user, userRole } = useContext(Context);
  const [authLoading, setAuthLoading] = useState(true);
  console.log("🔐 Auth state - isAuthenticated:", isAuthenticated, "authLoading:", authLoading);

  // Check authentication status on app startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Load from localStorage first
        const savedAuth = localStorage.getItem('authState');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          if (authData.isAuthenticated && authData.user && authData.userRole) {
            console.log("🔄 Restoring authentication from localStorage:", authData);
            // Set the authentication state from localStorage
            setIsAuthenticated(true);
            setUser(authData.user);
            setUserRole(authData.userRole);
          } else {
            console.log("⚠️ Invalid auth data in localStorage, clearing");
            localStorage.removeItem('authState');
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem('authState'); // Clear corrupted data
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // Remove function dependencies to prevent infinite loops

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    console.log("🔒 ProtectedRoute check - authLoading:", authLoading, "isAuthenticated:", isAuthenticated, "userRole:", userRole);

    // Don't check authentication while still loading
    if (authLoading) {
      console.log("⏳ Still loading authentication, showing loading...");
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div>
            <div style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 12px'
            }}></div>
            <p>Verifying authentication...</p>
          </div>
        </div>
      );
    }

    console.log("👤 User data:", user);

    if (!isAuthenticated) {
      console.log("❌ Not authenticated, redirecting to login");
      return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      console.log("🚫 Role not allowed for userRole:", userRole, "allowedRoles:", allowedRoles);
      // Redirect to appropriate dashboard based on role
      if (userRole === 'doctor') {
        return <Navigate to="/Viewall-appointment" />;
      } else if (userRole === 'admin') {
        return <Navigate to="/admin-dashboard" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }

    console.log("✅ Access granted to protected route");
    return children;
  };

  // Removed the useEffect that was resetting authentication state on app startup
  // Authentication will be handled by individual login forms and cookie-based auth

  return (
    <>
      <Router>
        <Navbar />
        <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}><h1>Test Route</h1><p>If you can see this, routing is working!</p></div>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute allowedRoles={['patient']}><Appointment /></ProtectedRoute>} />
          <Route path="/opd-module" element={<OPDModule />} />
          <Route path="/ipd-module" element={<IPDModule />} />
          <Route path="/radiology-module" element={<RadiologyModule />} />
          <Route path="/ot-module" element={<OTModule />} />
          <Route path="/pathology-module" element={<PathologyModule />} />
          <Route path="/nursing-station-module" element={<NursingStationModule />} />
          <Route path="/inventory-module" element={<InventoryModule />} />
          <Route path="/pharmacy-module" element={<PharmacyModule />} />
          <Route path="/disease-prediction" element={<DiseasePrediction />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/Viewall-appointment" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAppointments /></ProtectedRoute>} />
          <Route path="*" element={<div style={{ padding: '20px', textAlign: 'center' }}><h1>404 - Page Not Found</h1><p>Route: {window.location.pathname}</p></div>} />
          <Route path="/test-connection" element={
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
              <h2>🔧 API Connection Test</h2>
              <p>Use this page to test if the frontend can connect to the backend.</p>

              <div style={{ margin: '20px 0' }}>
                <button onClick={async () => {
                  try {
                    console.log('Testing root endpoint...');
                    const response = await fetch('https://hospital-management-system-backend-dxt6.onrender.com/');
                    const data = await response.text();
                    alert(`✅ Root endpoint works!\nResponse: ${data}`);
                  } catch (error) {
                    alert(`❌ Root endpoint failed: ${error.message}`);
                  }
                }} style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Test Root Endpoint
                </button>

                <button onClick={async () => {
                  try {
                    console.log('Testing patient registration...');
                    const response = await fetch('https://hospital-management-system-backend-dxt6.onrender.com/Pregister', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: 'Test User',
                        email: `test${Date.now()}@example.com`,
                        phone: '1234567890',
                        password: 'password123'
                      })
                    });
                    const data = await response.json();
                    alert(`✅ Registration works!\nStatus: ${response.status}\nMessage: ${data.message}`);
                  } catch (error) {
                    alert(`❌ Registration failed: ${error.message}`);
                  }
                }} style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Test Registration
                </button>

                <button onClick={async () => {
                  try {
                    console.log('Testing doctors endpoint...');
                    const response = await fetch('https://hospital-management-system-backend-dxt6.onrender.com/viewAll-doctors');
                    const data = await response.json();
                    alert(`✅ Doctors endpoint works!\nFound ${data.doctor?.length || 0} doctors`);
                  } catch (error) {
                    alert(`❌ Doctors endpoint failed: ${error.message}`);
                  }
                }} style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Test Doctors Endpoint
                </button>
              </div>

              <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <h3>📋 Instructions:</h3>
                <ol style={{ textAlign: 'left', display: 'inline-block' }}>
                  <li>Click each button to test different API endpoints</li>
                  <li>Check the browser console (F12) for detailed logs</li>
                  <li>If all tests pass, the backend connection is working</li>
                  <li>If tests fail, check your internet connection and try again</li>
                </ol>
              </div>
            </div>
          } />
        </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
