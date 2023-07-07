/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({});

const nextConfig = withPWA({
  dest: 'public',
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  future: { webpack5: true },
});

module.exports = nextConfig;
