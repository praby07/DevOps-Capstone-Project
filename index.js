const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Capstone Pipeline is live 🚀',
    hostname: os.hostname(),
    timestamp: new Date().toISOString(),
  });
});

// Simple health check — useful for Docker HEALTHCHECK, load balancers, and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
