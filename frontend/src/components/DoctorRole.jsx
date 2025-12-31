import React, { useState, useContext } from "react";
import axios from "axios";
import { FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
// import { API_BASE_URL } from "../config"; // Using direct URL instead

const DoctorRole = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, setUserRole } = useContext(Context);
  const [showForm, setShowForm] = useState("none"); // 'register' or 'login'
  const navigate = useNavigate();
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState(1);
  const [phone, setPhone] = useState("");
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: `https://hospital-management-system-backend-dxt6.onrender.com/Dlogin`,
        data: { email, password },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user); // This will trigger the updateUser function which handles userRole
      setEmail("");
      setPassword("");
      navigate("/Viewall-appointment");
    } catch (err) {
      console.error("Doctor login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password, specialty, experience, phone };
      const res = await axios({
        method: 'POST',
        url: `https://hospital-management-system-backend-dxt6.onrender.com/Dregister`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(res.data.message || "Doctor registered successfully");
      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setSpecialty("");
      setExperience(1);
      setPhone("");
      setShowForm("none");
    } catch (err) {
      console.error("Doctor registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

return (
    <div className="role-card doctor-role">
      <div className="icon">
        <FaUserMd size={40} color="#007BFF" />
      </div>
      <h3>Doctors</h3>
      <p>EMR, orders, e-Rx, results & summaries.</p>
      <div className="actions">
        <button onClick={() => setShowForm("register")} className="purple-btn">Register</button>
        <button onClick={() => setShowForm("login")} className="white-btn">Login</button>
      </div>

      {showForm === "register" && (
        <form onSubmit={handleRegister} className="doctor-form">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
          <input type="number" placeholder="Experience (years)" value={experience} onChange={(e) => setExperience(Number(e.target.value))} min={0} max={50} />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="submit">Submit Register</button>
        </form>
      )}

      {showForm === "login" && (
        <form onSubmit={handleLogin} className="doctor-form">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Submit Login</button>
        </form>
      )}
    </div>
  );
};
export default DoctorRole;