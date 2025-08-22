"use client";
import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Hugging Face backend API URL
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

      // Backend response key adjust karo yaha
      setResult(
        data.result || JSON.stringify(data, null, 2) || "⚠️ No response received."
      );
    } catch (err) {
      setResult("⚠️ Error connecting to backend API.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🩺 Healthcare Symptom Checker
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="border rounded-md p-3 text-sm w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Checking..." : "Check Symptoms"}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <strong className="block mb-2">AI Suggestion:</strong>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-500 text-center">
          ⚠️ Disclaimer: This tool is for educational purposes only.
          <br />
          It is NOT a substitute for professional medical advice.
        </p>
      </div>
    </main>
  );
}
