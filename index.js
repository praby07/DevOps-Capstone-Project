const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Capstone Pipeline</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #fff;
        }
        .card {
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 40px 60px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          backdrop-filter: blur(6px);
        }
        h1 { font-size: 2rem; margin-bottom: 10px; }
        p { margin: 6px 0; opacity: 0.85; }
        .badge {
          display: inline-block;
          margin-top: 16px;
          padding: 6px 16px;
          background: #22c55e;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 DevOps Capstone Pipeline is Live</h1>
        <p><strong>Hostname:</strong> ${os.hostname()}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <span class="badge">● Running</span>
      </div>
    </body>
    </html>
  `);
});

// Simple health check — useful for Docker HEALTHCHECK, load balancers, and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
