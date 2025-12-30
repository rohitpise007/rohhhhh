import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <div className="dashboard-wrapper">
        <Hero title={"Schedule Your Appointment "} imageUrl={"/signin.png"} />
        <AppointmentForm />
      </div>
    </>
  );
};

export default Appointment;
