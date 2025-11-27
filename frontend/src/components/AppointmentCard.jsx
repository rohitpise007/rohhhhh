// src/components/AppointmentCard.jsx
import React from "react";

export default function AppointmentCard({ appointment }) {
  // allow appointment to be null/undefined without breaking UI
  if (!appointment) return null;

  const {
    doctorName = appointment.doctorName || appointment.name || "Doctor",
    date = appointment.date || appointment.datetime || appointment.scheduledAt || "N/A",
    time = appointment.time || (appointment.datetime ? new Date(appointment.datetime).toLocaleTimeString() : "N/A"),
    status = appointment.status || appointment.state || "Pending",
  } = appointment;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h3 className="text-lg font-semibold text-gray-800">{doctorName}</h3>
      <p className="text-gray-600">Date: {date}</p>
      <p className="text-gray-600">Time: {time}</p>
      <p className="text-gray-600">Status: {status}</p>
    </div>
  );
}
