import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
// Using direct backend URL instead of API_BASE_URL
import { FaUserShield, FaLock, FaEnvelope } from "react-icons/fa";

const AdminLogin = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        method: 'POST',
        url: `https://hospital-management-system-backend-dxt6.onrender.com/Alogin`,
        data: { email, password },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });

      toast.success(response.data.message || "Admin login successful!");

      // Set user data with explicit role
      const userData = {
        ...response.data.user,
        role: 'admin' // Ensure role is set
      };

      setIsAuthenticated(true);
      setUser(userData); // This will trigger the updateUser function which handles userRole
      setEmail("");
      setPassword("");

      // Small delay to ensure state updates
      setTimeout(() => {
        navigateTo("/admin-dashboard");
      }, 200);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Admin login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-icon">
            <FaUserShield size={50} />
          </div>
          <h2>Administrator Login</h2>
          <p>Access the admin dashboard</p>
        </div>

        <form onSubmit={handleAdminLogin} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="admin@zeecare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner-small"></div>
                Signing In...
              </>
            ) : (
              <>
                <FaUserShield />
                Login as Administrator
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Not an administrator?</p>
          <div className="login-options">
            <Link to="/login" className="patient-login-link">
              Patient Login
            </Link>
            <span className="divider">•</span>
            <Link to="/register" className="patient-register-link">
              Patient Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;