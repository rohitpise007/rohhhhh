import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Viewall-appointment", {
          withCredentials: true,
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        toast.error("Failed to load appointments");
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <p><strong>Disease:</strong> {appt.disease}</p>
              <p><strong>About:</strong> {appt.about}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p><strong>Patient ID:</strong> {appt.user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
