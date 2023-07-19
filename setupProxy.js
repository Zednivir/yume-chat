const { createProxyMiddleware } = require('http-proxy-middleware');

// Define a variable for the API URL
const API_URL = process.env.API_URL || 'https://continuity-organize-geography-eg.trycloudflare.com/api';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
};
