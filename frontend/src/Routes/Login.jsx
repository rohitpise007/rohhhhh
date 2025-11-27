// src/Routes/Login.jsx
import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'doctor') navigate('/doctor');
      else navigate('/patient');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Login</h2>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div>
      <button type="submit">Login</button>
    </form>
  );
}
