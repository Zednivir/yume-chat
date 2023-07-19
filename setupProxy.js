const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://child-authorization-cities-say.trycloudflare.com/api', // Update the target URL here
      changeOrigin: true,
    })
  );
};
