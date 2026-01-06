import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
// Using direct backend URL instead of API_BASE_URL

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user, setUserRole } = useContext(Context);

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
    console.log("🔐 Login form submitted");
    console.log("📧 Email:", email);
    console.log("👤 User type:", userType);

    if (!validateLoginForm()) {
      console.log("❌ Form validation failed");
      return;
    }

    console.log("🚀 Starting login process");
    setIsLoading(true);

    try {
      let endpoint = "";
      if (userType === "patient") {
        endpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Plogin`;
      } else if (userType === "doctor") {
        endpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Dlogin`;
      }

      console.log("🌐 Making request to:", endpoint);
      const requestData = { email: email.trim(), password };
      console.log("📦 Request data:", requestData);

      const response = await axios({
        method: 'POST',
        url: endpoint,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, // Required to receive authentication cookies
        timeout: 10000, // 10 second timeout
      });

      console.log("✅ Login response received:", response.status);
      console.log("📦 Response data:", response.data);

      // Check if we have user data
      if (!response.data.user) {
        console.error("❌ No user data in response");
        toast.error("Invalid response from server");
        return;
      }

      // Set authentication state
      const userData = response.data.user;
      console.log("👤 Setting user data:", userData);

      setIsAuthenticated(true);
      setUser(userData); // This will trigger the updateUser function which handles userRole
      setEmail("");
      setPassword("");

      toast.success(response.data.message || "Login successful!");
      console.log("🎉 Authentication state set successfully");

      // Redirect based on user role from response
      const userRole = userData?.role;
      console.log("🔀 Redirecting based on role:", userRole);

      // Redirect immediately since state updates are synchronous
      console.log("🔀 Starting redirect process...");
      console.log("👤 User role for redirect:", userData?.role);

      if (userData?.role === "doctor") {
        console.log("🏥 Redirecting to doctor dashboard");
        navigateTo("/Viewall-appointment");
      } else if (userData?.role === "admin") {
        console.log("👑 Redirecting to admin dashboard");
        navigateTo("/admin-dashboard");
      } else {
        console.log("👤 Redirecting to patient dashboard");
        navigateTo("/dashboard");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      console.error("📊 Error response:", error.response);
      console.error("📊 Error status:", error.response?.status);
      console.error("📊 Error data:", error.response?.data);

      let errorMessage = "Login failed. Please check your credentials.";

      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Invalid credentials";
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Please check your credentials.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. The backend may not be properly configured. Please check environment variables on Render.";
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!error.response) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      }

      console.error("🚨 Final error message:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      console.log("🔄 Login process completed");
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

        <div className="google-login-section">
          <div className="divider">
            <span>or</span>
          </div>
          <GoogleLogin
            onSuccess={(user) => {
              setIsAuthenticated(true);
              setUser(user);
              setUserRole(user.role);
              toast.success("Login successful!");
              navigateTo(user.role === 'admin' ? '/admin-dashboard' :
                        user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
            }}
            onError={(error) => {
              toast.error(error);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
