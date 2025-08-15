// ResumeAnalyzer.js
import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


export function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Upload a PDF resume first.');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/analyze`, formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleChange}
        className="file-input"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="analyze-btn"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {result && (
        <div className="result-card">
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Score</h2>
          <p>{result.score}</p>

          <h2>Feedback</h2>
          <p>{result.feedback}</p>

          <h2>Resume Stats</h2>
          <p>Word Count: {result.wordCount}</p>
          <p>Pages: {result.pageCount}</p>
        </div>
      )}
    </div>
  );
}

export default App;
