// src/Routes/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div style={{ padding: 20 }}>
      <h1>Hospital Portal</h1>
      <p>Quick actions: <Link to="/symptom">Symptom Checker</Link> | <Link to="/login">Login</Link></p>
      <h3>Helpline</h3>
      <p>Call: +1-800-EXAMPLE or email: help@hospital.example</p>
    </div>
  );
}
