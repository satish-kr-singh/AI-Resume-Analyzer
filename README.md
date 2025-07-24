# 📄 AI-Powered Resume Analyzer

This is an AI-powered web application that allows users to upload a PDF resume and receive intelligent feedback using state-of-the-art language models from Hugging Face.

---

## 🚀 Features

- ✅ Upload PDF resumes via the frontend
- 🧠 Automatically extracts text from PDF
- 🤖 Uses Hugging Face Transformers to summarize and analyze the resume
- 💡 Provides feedback and improvement suggestions
- 📦 Chunking logic supports large resume files

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **AI Model:** Hugging Face (`facebook/bart-large-cnn`, or any summarization model)
- **PDF Parsing:** `pdf-parse`
- **File Upload:** `multer`

---


---

## 🧪 How It Works

1. User uploads a PDF resume via the frontend.
2. Backend extracts text using `pdf-parse`.
3. Text is split into chunks to avoid model length limitations.
4. Each chunk is sent to Hugging Face’s summarization model.
5. All summaries are combined into a final resume analysis.

---



