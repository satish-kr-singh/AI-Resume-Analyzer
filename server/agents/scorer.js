function scoreResume(text) {
  let score = 100;
  const feedback = [];

  // Simple scoring examples
  if (text.length < 200) {
    score -= 20;
    feedback.push("Resume is too short; add more details.");
  }

  const keywords = ["experience", "education", "skills"];
  keywords.forEach((k) => {
    if (!text.toLowerCase().includes(k)) {
      score -= 10;
      feedback.push(`Missing section: ${k}`);
    }
  });

  return { score, feedback: feedback.join(" ") };
}

module.exports = { scoreResume };
