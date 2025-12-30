import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const validateLoginForm = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    // Temporarily disable validation for testing
    console.log("Starting login process");
    setIsLoading(true);

    try {
      let endpoint = "";
      if (userType === "patient") {
        endpoint = `${API_BASE_URL}/Plogin`;
      } else if (userType === "doctor") {
        endpoint = `${API_BASE_URL}/Dlogin`;
      }

      const response = await axios.post(
        endpoint,
        { email: email.trim(), password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message || "Login successful!");
      setIsAuthenticated(true);
      setUser(response.data.user);
      setEmail("");
      setPassword("");

      // Redirect based on user role from response
      const userRole = response.data.user?.role;
      if (userRole === "doctor") {
        navigateTo("/Viewall-appointment");
      } else if (userRole === "admin") {
        navigateTo("/admin-dashboard");
      } else {
        navigateTo("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    // Redirect based on user role if already authenticated
    const userRole = user?.role;
    if (userRole === "doctor") {
      return <Navigate to="/Viewall-appointment" />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Access your healthcare dashboard to manage appointments, reports, and medical records.
        </p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-select"
              disabled={isLoading}
            >
              <option value="patient">Login as Patient</option>
              <option value="doctor">Login as Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-links">
            <p>Not Registered?</p>
            <Link to="/register" className="form-link">
              Register Now
            </Link>
          </div>

          <div className="form-submit">
            <button
              type="submit"
              className="form-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
