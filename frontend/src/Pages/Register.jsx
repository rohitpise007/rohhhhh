import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

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
    console.log("Registration form submitted");

    // Temporarily disable validation for testing
    console.log("Starting registration process");
    setIsLoading(true);

    console.log("Registration attempt:", { name, email, phone, password, role, specialty, experience });

    try {
      let endpoint = "";
      let payload = {};

      if (role === "patient") {
        endpoint = `${API_BASE_URL}/Pregister`;
        payload = { name: name.trim(), email: email.trim(), phone: phone.trim(), password };
      } else if (role === "doctor") {
        endpoint = `${API_BASE_URL}/Dregister`;
        payload = {
          name: name.trim(),
          email: email.trim(),
          password,
          specialty: specialty.trim(),
          experience: parseInt(experience),
          phone: phone.trim()
        };
      }

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registration success:", response.data);
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
        navigateTo("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
