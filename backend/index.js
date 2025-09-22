import express from 'express';
import { callGeminiAPI } from './gemini.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});



// POST /api/research
app.post('/api/research', async (req, res) => {
  const { query, documentId } = req.body;
  if (!query || !documentId) {
    return res.status(400).json({ error: 'Missing query or documentId' });
  }

  // TODO: Load document content from storage/database
  // For now, use a mock document content
  const documentContent = `Content of document ${documentId}`;

  try {
    const geminiResult = await callGeminiAPI(query, documentContent);
    res.json(geminiResult);
  } catch (err) {
    res.status(500).json({ error: 'Gemini API call failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
