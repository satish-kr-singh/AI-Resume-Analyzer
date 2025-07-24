const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fs = require('fs');
  const dataBuffer = fs.readFileSync(file.path);
  try {
    const pdfData = await pdfParse(dataBuffer);
    let resumeText = pdfData.text;
    resumeText = resumeText.slice(0, 2000);

    // Example: Send to a summarization model
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: resumeText },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ feedback: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error analyzing resume' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
