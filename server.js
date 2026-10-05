import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory or logging for contact inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  console.log(`[CONTACT INQUIRY] From: ${name} <${email}>\nMessage: ${message}\nTime: ${new Date().toISOString()}`);

  return res.status(200).json({
    success: true,
    message: 'Thank you for your message, Fahmidha will get back to you shortly!'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Contact API server running at http://localhost:${PORT}`);
});
