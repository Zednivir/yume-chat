const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

const API_URL = 'https://hungary-revision-sl-merchants.trycloudflare.com';

app.use(express.json());

app.all('/api/*', async (req, res) => {
  try {
    const targetUrl = API_URL + req.url.replace('/api', ''); // Adjust the path if needed
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the API.' });
  }
});

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
