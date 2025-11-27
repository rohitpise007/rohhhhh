// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/symptom">Symptom Checker</Link>{" | "}
      {user ? (
        <>
          {user.role === 'patient' && <Link to="/patient">Patient Dashboard</Link>}
          {user.role === 'doctor' && <Link to="/doctor">Doctor Dashboard</Link>}
          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
}
