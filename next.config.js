/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Better webpack configuration for mixed structure
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@/components': require('path').resolve(__dirname, 'src/components'),
      '@/styles': require('path').resolve(__dirname, 'src/styles'),
    }
    
    // Add src to module resolution
    config.resolve.modules.push(require('path').resolve(__dirname, 'src'))
    
    return config
  },
}

module.exports = nextConfig