// src/Routes/PatientDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import AppointmentCard from "../components/AppointmentCard";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("/patient/appointments")
      .then((res) => setAppointments(res.data || res.data.appointments || []))
      .catch((err) => {
        console.error("Error fetching appointments", err);
        setAppointments([]); // fallback
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Patient Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment._id || appointment.id} appointment={appointment} />
          ))
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
}
