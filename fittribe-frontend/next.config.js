/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  webpack: (config) => {
    // Important for React Three Fiber
    config.externals.push({
      'sharp': 'commonjs sharp',
    });
    return config;
  },
}

module.exports = nextConfig
