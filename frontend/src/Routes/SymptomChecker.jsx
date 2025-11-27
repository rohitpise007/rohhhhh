// src/Routes/SymptomChecker.jsx
import React, { useState } from 'react';
import API from '../api/api';

export default function SymptomChecker(){
  const [symptoms, setSymptoms] = useState('');
  const [temp, setTemp] = useState('');
  const [result, setResult] = useState(null);

  const check = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/symptom/check', { symptoms: symptoms ? symptoms.split(',').map(s=>s.trim()) : [], temp: Number(temp) });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Check failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Symptom Checker</h2>
      <form onSubmit={check}>
        <input placeholder="symptoms, comma separated" value={symptoms} onChange={e=>setSymptoms(e.target.value)} /><br/>
        <input placeholder="temperature" value={temp} onChange={e=>setTemp(e.target.value)} /><br/>
        <button type="submit">Check</button>
      </form>
      {result && (
        <div style={{ marginTop: 10 }}>
          <h4>Probable diseases</h4>
          {(!result.probable || result.probable.length === 0) ? <div>No matches</div> : result.probable.map(p => (<div key={p.name}>{p.name} — match {Math.round((p.score || 0) * 100)}%</div>))}
          <div>{result.tempAdvice}</div>
        </div>
      )}
    </div>
  );
}
