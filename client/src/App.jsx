import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Upload a PDF resume first.');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/analyze', formData);
      console.log(res)
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      alert('Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">🧠 AI Resume Analyzer</h1>

      <input type="file" accept=".pdf" onChange={handleChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {feedback && (
        <div className="mt-6 w-full max-w-3xl bg-white p-4 rounded shadow text-sm whitespace-pre-wrap">
          <h2 className="text-lg font-semibold mb-2">📋 AI Feedback:</h2>
          {feedback[0]?.summary_text}
        </div>
      )}
    </div>
  );
}

export default App;
