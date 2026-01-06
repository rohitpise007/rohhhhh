import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaSignOutAlt, FaBars, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
// import { API_BASE_URL } from "../config"; // Using direct URL instead

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user, userRole } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // Determine logout endpoint based on user role
      let logoutEndpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Plogout`;
      if (userRole === 'admin') {
        logoutEndpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Alogout`; // We'll need to add this endpoint
      }

      await axios.get(logoutEndpoint, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout completed (server error ignored)");
    } finally {
      // Always clear local state and localStorage
      setIsAuthenticated(false);
      localStorage.removeItem('authState');
      navigateTo("/");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  const goToDashboard = () => {
    // Navigate to appropriate dashboard based on user role
    if (userRole === 'doctor') {
      navigateTo("/Viewall-appointment");
    } else if (userRole === 'admin') {
      navigateTo("/admin-dashboard");
    } else {
      navigateTo("/dashboard");
    }
    setShow(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="ZeeCare Medical" className="logo-img" />
              <span className="brand-name">ZeeCare</span>
            </Link>
          </div>

          <div className={`nav-menu ${show ? "showmenu" : ""}`}>
            <div className="nav-links">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setShow(false)}
              >
                Home
              </Link>
              {isAuthenticated && userRole === 'patient' && (
                <>
                  <Link
                    to="/dashboard"
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                    onClick={() => setShow(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              {isAuthenticated && userRole === 'doctor' && (
                <Link
                  to="/Viewall-appointment"
                  className={`nav-link ${isActive('/Viewall-appointment') ? 'active' : ''}`}
                  onClick={() => setShow(false)}
                >
                  Appointments
                </Link>
              )}
              {isAuthenticated && userRole === 'admin' && (
                <Link
                  to="/admin-dashboard"
                  className={`nav-link ${isActive('/admin-dashboard') ? 'active' : ''}`}
                  onClick={() => setShow(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/disease-prediction"
                className={`nav-link ${isActive('/disease-prediction') ? 'active' : ''}`}
                onClick={() => setShow(false)}
              >
                AI Diagnosis
              </Link>
              <Link
                to="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setShow(false)}
              >
                About Us
              </Link>
            </div>

            <div className="nav-actions">
              {isAuthenticated ? (
                <div className="user-menu">
                  <div className="user-info" onClick={goToDashboard}>
                    <div className="user-avatar">
                      <FaUser />
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user?.name || 'User'}</span>
                      <span className="user-role">
                        {userRole === 'admin' ? 'Administrator' :
                         userRole === 'doctor' ? 'Doctor' : 'Patient'}
                      </span>
                    </div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout} title="Logout">
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <div className="guest-actions">
                  <Link to="/register" className="register-btn">
                    <FaUser />
                    Sign Up
                  </Link>
                  <button className="login-btn" onClick={goToLogin}>
                    <FaUser />
                    Login
                  </button>
                  <Link to="/admin-login" className="admin-link">
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="hamburger" onClick={() => setShow(!show)}>
            {show ? <FaBars /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
