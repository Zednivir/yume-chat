const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const path = require('path');

const app = express();
const port = 3000; // You can change this port if needed

app.use(express.json());

// Create a proxy endpoint to forward the API requests
app.all('/api/*', async (req, res) => {
  try {
    const htmlPath = path.join(__dirname, 'index.html'); 
    const dom = await JSDOM.fromFile(htmlPath);

    dom.window.addEventListener("DOMContentLoaded", function () {
      const KoboldKey = dom.window.document.querySelector('.koboldKey');
      const targetApiUrl = KoboldKey.textContent.trim(); // Assuming .koboldKey contains the URL
  
      const url = `${targetApiUrl}${req.url}`;
  
      axios({
        method: req.method,
        url,
        headers: {
          ...req.headers,
          'User-Agent': 'Your User Agent', // Replace this with your User Agent string
        },
        data: req.body,
      }).then(response => {
        // Forward the API response back to the client
        res.status(response.status).json(response.data);
      }).catch(error => {
        // If there's an error, forward the error response to the client
        if (error.response) {
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).json({ error: 'An internal server error occurred.' });
        }
      });
    });
  } catch (error) {
    // If there's an error, forward the error response to the client
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
