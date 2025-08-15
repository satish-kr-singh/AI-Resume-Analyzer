// services/summarizer.js
const { callHuggingFaceModel } = require("../utils/hfClient");

async function summarizeText(text) {
  const model = "facebook/bart-large-cnn"; // example summarization model
  const summary = await callHuggingFaceModel(model, text);

  if (Array.isArray(summary) && summary[0]?.summary_text) {
    return summary[0].summary_text;
  }

  return summary; // fallback
}

module.exports = { summarizeText };
