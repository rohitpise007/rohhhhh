import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
// Using direct backend URL instead of API_BASE_URL

const Register = () => {
  const { isAuthenticated } = useContext(Context);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (role === "doctor") {
      if (!specialty.trim()) {
        toast.error("Please enter your specialty");
        return false;
      }
      if (!experience || experience < 0) {
        toast.error("Please enter valid years of experience");
        return false;
      }
    }
    return true;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("📝 Registration form submitted");
    console.log("👤 Role:", role);
    console.log("📧 Email:", email);

    if (!validateForm()) {
      console.log("❌ Form validation failed");
      return;
    }

    console.log("🚀 Starting registration process");
    setIsLoading(true);

    try {
      let endpoint = "";
      let payload = {};

      if (role === "patient") {
        endpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Pregister`;
        payload = { name: name.trim(), email: email.trim(), phone: phone.trim(), password };
      } else if (role === "doctor") {
        endpoint = `https://hospital-management-system-backend-dxt6.onrender.com/Dregister`;
        payload = {
          name: name.trim(),
          email: email.trim(),
          password,
          specialty: specialty.trim(),
          experience: parseInt(experience),
          phone: phone.trim()
        };
      }

      console.log("🌐 Making request to:", endpoint);
      console.log("📦 Payload:", payload);
      console.log("📦 Payload JSON:", JSON.stringify(payload));

      const response = await axios({
        method: 'POST',
        url: endpoint,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, // Required for CORS and cookie handling
        timeout: 10000, // 10 second timeout
      });

      console.log("✅ Registration response received:", response.status);
      console.log("📦 Response data:", response.data);

      toast.success(response.data.message || "Registration successful! Please login.");

      // Reset form
      setname("");
      setemail("");
      setphone("");
      setpassword("");
      setSpecialty("");
      setExperience(1);
      setRole("patient");

      // Navigate to login page
      setTimeout(() => {
        console.log("🔀 Redirecting to login page");
        navigateTo("/login");
      }, 1500);
    } catch (error) {
      console.error("❌ Registration error:", error);
      console.error("📊 Error response:", error.response);
      console.error("📊 Error status:", error.response?.status);
      console.error("📊 Error data:", error.response?.data);
      console.error("🌐 Error config:", error.config);
      console.error("🔗 Request URL:", error.config?.url);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || error.response.data?.msg || "Invalid registration data";
      } else if (error.response?.status === 409) {
        errorMessage = "User already exists with this email.";
      } else if (error.response?.status === 404) {
        errorMessage = "API endpoint not found. Please check backend deployment.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please check backend configuration.";
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!error.response) {
        errorMessage = "Network error: Cannot reach the server.";
      }

      console.error("🚨 Final error message:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      console.log("🔄 Registration process completed");
    }
  };


  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Join our healthcare community today. Create your account to access personalized medical services.
        </p>
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
              disabled={isLoading}
            >
              <option value="patient">Register as Patient</option>
              <option value="doctor">Register as Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
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
              onChange={(e) => setpassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          {role === "doctor" && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Specialty (e.g., Cardiology, Neurology)"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Years of Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="form-input"
                  min="0"
                  max="50"
                  disabled={isLoading}
                  required
                />
              </div>
            </>
          )}

          <div className="form-links">
            <p>Already Registered?</p>
            <Link to="/login" className="form-link">
              Login Now
            </Link>
          </div>

          <div className="form-submit">
            <button
              type="submit"
              className="form-button"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
