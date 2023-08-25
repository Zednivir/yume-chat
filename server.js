const express = require('express');
const fetch = require('node-fetch'); // For making API requests

const app = express();

const API_URL = 'https://fax-chinese-bbs-afternoon.trycloudflare.com/'; // Replace with the actual API URL you want to connect to

// Define a route to proxy API requests
app.get('/api', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the API.' });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
