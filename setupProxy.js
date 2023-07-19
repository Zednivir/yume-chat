const { createProxyMiddleware } = require('http-proxy-middleware');

// Define a variable for the API URL
const API_URL = process.env.API_URL || 'https://child-authorization-cities-say.trycloudflare.com/api';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
<<<<<<< HEAD
      target: 'https://child-authorization-cities-say.trycloudflare.com/api', // Update the target URL here
=======
      target: API_URL,
>>>>>>> a6e3c6dc3cb366d33fa7102094071272575b939a
      changeOrigin: true,
    })
  );
};
