/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVED: output: 'export' - this prevents API routes from working
  trailingSlash: true,
  
  // Configure for src/ directory structure
  experimental: {
    // Enable src/ directory support
    appDir: false,
  },
  
  images: {
    unoptimized: true
  },
  
  // Add path mapping for src/ directory
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }
    return config
  },
  
  // Optional: Add custom page extensions if needed
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Optional: Configure API routes
  async rewrites() {
    return [
      // This ensures API routes work correctly with src/ structure
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig