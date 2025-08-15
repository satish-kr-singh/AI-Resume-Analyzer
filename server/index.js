const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const { analyzeResume } = require("./coordinator"); // your multi-agent logic here

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
      numpages = pdfData.numpages;
    } else {
      // treat as plain text file
      text = fs.readFileSync(req.file.path, "utf-8");
    }

    // Call your multi-agent coordinator with extracted text
    const { summary, feedback, score } = await analyzeResume(text);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    //res.json(result);

    res.json({
      summary,
      score,
      feedback,
      wordCount: text.split(/\s+/).length,
      pageCount: numpages,
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
