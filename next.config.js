/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NODE_ENV === 'development' && 'http://localhost:3000' ||
      process.env.NODE_ENV === 'production' && process.env.PRODUCTION_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    GITHUB_CLIENT_ID: process.env.NODE_ENV === 'development' && process.env.GITHUB_CLIENT_ID_DEVELOPMENT ||
      process.env.NODE_ENV === 'production' && process.env.GITHUB_CLIENT_ID_PRODUCTION,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV
  },
  images: {
    domains: [ 'avatars.githubusercontent.com' ],
  },
};

module.exports = nextConfig;
