"use client";
import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ Apna Hugging Face backend ka URL yaha daalo
  const API_URL = "https://anuroopgupta-health.hf.space/infer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setResult(data.result || "No response received.");
    } catch (err) {
      setResult("⚠️ Error connecting to backend API.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🩺 Healthcare Symptom Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Symptoms"}
        </button>
      </form>

      {result && (
        <div className="result">
          <strong>AI Suggestion:</strong>
          <p>{result}</p>
        </div>
      )}

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#777" }}>
        ⚠️ Disclaimer: This tool is for educational purposes only. 
        It is NOT a substitute for professional medical advice.
      </p>
    </div>
  );
}
