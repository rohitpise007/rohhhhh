// src/components/SymptomForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SymptomForm() {
  const [symptom, setSymptom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!symptom.trim()) {
      setError("Please enter your symptom(s).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/patient/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Prediction failed");
        setLoading(false);
        return;
      }

      // prefer server-provided redirect, otherwise local build
      const redirect = data.redirectUrl || `/doctors?specialty=${encodeURIComponent(data.slug || data.specialty || "")}`;
      navigate(redirect);
    } catch (err) {
      setError("Network error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "block" }}>
      <label>Describe your symptoms:</label>
      <textarea
        rows={5}
        placeholder="e.g. chest pain and breathlessness for two days"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 8 }}
      />
      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Detecting..." : "Find Specialist"}
        </button>
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}
