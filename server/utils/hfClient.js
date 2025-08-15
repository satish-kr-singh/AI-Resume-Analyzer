// hfClient.js
const axios = require("axios");
require("dotenv").config();

const HF_API_URL = "https://api-inference.huggingface.co/models/";

async function callHuggingFaceModel(model, inputs) {
  try {
    const response = await axios.post(
      `${HF_API_URL}${model}`,
      { inputs },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error calling Hugging Face model ${model}:`, error.message);
    throw error;
  }
}

module.exports = { callHuggingFaceModel };
