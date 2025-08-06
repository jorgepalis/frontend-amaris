/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  
  typescript: {
    // ignoreBuildErrors: true,
  },
  eslint: {
    // ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },
}

module.exports = nextConfig
