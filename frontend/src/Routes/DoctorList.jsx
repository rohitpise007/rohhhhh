// src/pages/DoctorsList.jsx
import React, { useEffect, useState } from "react";
import { API } from "./api";

import { useLocation } from "react-router-dom";

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

export default function DoctorsList(){
  const q = useQuery();
  const specialty = q.get("specialty") || "general-physician";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await API.get("/api/doctors", {
          params: { specialty },
        });
        const data = await res.json();
        setDoctors(data.doctors || data || []);
      } catch (e) {
        console.error(e);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [specialty]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Doctors — {specialty.replace("-", " ").toUpperCase()}</h2>
      {loading && <div>Loading...</div>}
      {!loading && doctors.length === 0 && <div>No doctors found</div>}
      {!loading && doctors.map(d => (
        <div key={d._id || d.id} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          <div style={{ fontWeight: 700 }}>{d.name || d.fullName}</div>
          <div>{d.specialty || d.field}</div>
        </div>
      ))}
    </div>
  );
}
