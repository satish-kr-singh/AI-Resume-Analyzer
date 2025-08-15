// coordinator.js
const { summarizeText } = require("./agents/summarizer");
const { extractSkills } = require("./agents/skillExtractor");
const { scoreResume } = require("./agents/scorer");

function chunkText(text, maxLength = 1000) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + maxLength));
    start += maxLength;
  }
  return chunks;
}

async function analyzeResume(text) {
  const chunks = chunkText(text, 1000);

  // Summarize each chunk
  const summaries = await Promise.all(
    chunks.map((chunk) => summarizeText(chunk))
  );
  const combinedSummary = summaries.join(" ");

  // Get feedback score
  const { score, feedback } = scoreResume(text);

  return { summary: combinedSummary, feedback, score };
}

module.exports = { analyzeResume };
