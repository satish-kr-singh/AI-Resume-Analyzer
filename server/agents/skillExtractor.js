// agents/skillExtractor.js
const { callHuggingFaceModel } = require("../utils/hfClient");

async function extractSkills(text) {
  const model = "tiiuae/falcon-7b-instruct";

  const prompt = `
Extract only technical skills (programming languages, frameworks, cloud, databases, tools) from the following resume text.
Return the result as a JSON array of skill names.

Resume Text:
${text}
`;

  try {
    const result = await callHuggingFaceModel(model, prompt);

    // The result may be text; try parsing as JSON
    let skills = [];
    try {
      skills = JSON.parse(result);
    } catch {
      // fallback: split by commas if JSON parsing fails
      skills = result
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    return skills;
  } catch (err) {
    console.error("Error in extractSkills():", err.message);
    return [];
  }
}

module.exports = { extractSkills };
