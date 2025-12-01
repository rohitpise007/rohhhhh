import React, { useState, useContext } from "react";
import axios from "axios";
import { FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";

const DoctorRole = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [showForm, setShowForm] = useState("none"); // 'register' or 'login'
  const navigate = useNavigate();
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/Dlogin",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.doctor);
      setEmail("");
      setPassword("");
       navigate("/Viewall-appointment");
    } catch (err) {
      toast.error(err.response.data.message);
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
        <button onClick={() => setShowForm("register")}>Register</button>
        <button onClick={() => setShowForm("login")}>Login</button>
      </div>

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