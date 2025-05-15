import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Ruta que genera el token
app.post('/generate-token', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/assistants/ephemeral_tokens', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: 'Error generating token', details: data });
    }

    res.json({ token: data.token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});