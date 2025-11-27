// src/Routes/BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [datetime, setDatetime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [temp, setTemp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/doctors')
      .then(r => setDoctors(r.data || []))
      .catch((err) => {
        console.error('Failed to load doctors', err);
        setDoctors([]);
      });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        doctorId,
        datetime,
        symptoms: symptoms ? symptoms.split(',').map(s => s.trim()) : [],
        temp: temp ? Number(temp) : undefined
      };

      await API.post('/appointments/book', payload);
      alert('Booked!');
      navigate('/patient');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Booking failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Book Appointment</h2>
      <select value={doctorId} onChange={e => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map(d => <option value={d._id || d.id} key={d._id || d.id}>{d.name || d.fullName || d.title}</option>)}
      </select><br/>
      <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} /><br/>
      <input placeholder="symptoms, comma separated" value={symptoms} onChange={e => setSymptoms(e.target.value)} /><br/>
      <input placeholder="temperature" value={temp} onChange={e => setTemp(e.target.value)} /><br/>
      <button type="submit">Book</button>
    </form>
  );
}
