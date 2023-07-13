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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

module.exports = nextConfig;
