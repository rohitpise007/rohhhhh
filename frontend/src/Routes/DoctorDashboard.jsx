// src/Routes/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import AppointmentCard from "../components/AppointmentCard";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("/doctor/appointments")
      .then((res) => {
        // Support different response shapes
        const data = res.data || [];
        setAppointments(Array.isArray(data) ? data : (data.appointments || []));
      })
      .catch(err => {
        console.error('Failed loading doctor appointments', err);
        setAppointments([]);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <div>No appointments yet.</div>
      ) : (
        appointments.map((a) => (
          <AppointmentCard key={a._id || a.id} appointment={a} />
        ))
      )}
    </div>
  );
}
