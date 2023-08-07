const express = require('express');
const axios = require('axios');
const os = require('os');

const app = express();
const port = 3000; // You can change this port if needed

const targetApiUrl = process.env.API_URL || 'https://api.example.com'; // Use the environment variable or the default API URL

app.use(express.json());

// Create a proxy endpoint to forward the API requests
app.all('/api/*', async (req, res) => {
  const url = `${targetApiUrl}${req.url}`;

  try {
    const response = await axios({
      method: req.method,
      url,
      headers: {
        ...req.headers,
        'User-Agent': 'Your User Agent', // Replace this with your User Agent string
      },
      data: req.body,
    });

    // Forward the API response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // If there's an error, forward the error response to the client
    res.status(error.response.status).json(error.response.data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
