import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Proxy endpoint for Ollama (phi3 model)
router.post('/chat', async (req, res) => {
  try {
    const { prompt, options } = req.body;
    const ollamaUrl = 'http://localhost:11434/api/generate';
    const ollamaBody = {
      model: 'phi3',
      prompt,
      ...options
    };
    const ollamaRes = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ollamaBody)
    });
    if (!ollamaRes.ok) {
      return res.status(500).json({ error: 'Ollama API error', details: await ollamaRes.text() });
    }
    const data = await ollamaRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

export default router;
