/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  
  // Enable src directory support
  experimental: {
    appDir: false,
  },
  
  images: {
    unoptimized: true
  },
  
  // Better webpack configuration for src/ directory
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }
    
    // Add src to resolve modules
    config.resolve.modules.unshift(require('path').resolve(__dirname, 'src'))
    
    return config
  },
}

module.exports = nextConfig