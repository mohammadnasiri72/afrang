/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    domains: ['admin.afrangdigital.com', 'afrangdigital.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.afrangdigital.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  generateBuildId: async () => `${Date.now()}`,

  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'react-icons'],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 30000,
        maxSize: 250000,
        maxInitialRequests: 5,
        maxAsyncRequests: 7,

        cacheGroups: {
          // --- UI Libraries ---
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: 'antd',
            priority: 30,
            chunks: 'all',
          },

          reactIcons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'react-icons',
            priority: 25,
            chunks: 'async',
          },

          // --- Heavy libs (lazy فقط) ---
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: 'swiper',
            priority: 25,
            chunks: 'async',
          },

          leaflet: {
            test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
            name: 'leaflet',
            priority: 25,
            chunks: 'async',
          },

          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 25,
            chunks: 'async',
          },

          sweetalert2: {
            test: /[\\/]node_modules[\\/]sweetalert2[\\/]/,
            name: 'sweetalert2',
            priority: 25,
            chunks: 'async',
          },

          // --- Shared vendor (واقعاً مشترک) ---
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },

          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
  },

  async headers() {
    return [
      {
        source: '/font/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/style/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
