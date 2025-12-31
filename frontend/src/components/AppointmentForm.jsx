import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [doctorId, setDoctorId] = useS
  tate("");
  const [disease, setDisease] = useState("");
  const [about, setAbout] = useState("");
  const [doctor, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/viewAll-doctors`, {
          withCredentials: true,
        });
        setDoctors(data.doctor);
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
        `${API_BASE_URL}/Create-appointment`,
        { doctor: doctorId, disease, about },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setDoctorId("");
      setDisease("");
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
