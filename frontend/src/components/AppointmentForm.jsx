import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [doctorId, setDoctorId] = useState("");
  const [disease, setDisease] = useState("");
  const [about, setAbout] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/viewAll-doctors`, {
          withCredentials: true,
        });
        setDoctor(data.doctor);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://hospital-management-system-backend-dxt6.onrender.com/Create-appointment`,
        { doctor: doctorId, disease, about, appointmentDate, appointmentTime },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setDoctorId("");
      setDisease("");
      setAppointmentDate("");
      setAppointmentTime("");
      setAbout("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating appointment");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctor.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, color: '#666' }}>Preferred Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, color: '#666' }}>Preferred Time</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            rows="5"
            placeholder="Describe your condition"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};
export default AppointmentForm;
