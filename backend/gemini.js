// Gemini API endpoint and key will be loaded from .env
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function callGeminiAPI(query, documentContent) {
  if (!GEMINI_API_KEY) throw new Error('Missing Gemini API key');

  // Gemini expects a prompt with context and question
  const payload = {
    contents: [
      {
        parts: [
          { text: `Document: ${documentContent}\nQuestion: ${query}` }
        ]
      }
    ]
  };

  const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  // Parse Gemini response to match frontend format
  const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return {
    results: [
      {
        id: 1,
        title: `Gemini Research Result`,
        snippet: geminiText,
        citations: ['Gemini API'],
        relevance: 1.0,
        source: 'Gemini',
        type: 'document',
        pageNumber: 1
      }
    ]
  };
}
