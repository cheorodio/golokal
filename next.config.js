/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({});

const nextConfig = withPWA({
  dest: 'public',
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
});

module.exports = nextConfig;
