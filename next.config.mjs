/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['admin.afrangdigital.com', 'afrangdigital.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.afrangdigital.com',
        port: '',
        pathname: '/**',
      },
    ],
    // بهینه‌سازی تصاویر
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  generateBuildId: async () => {
    return `${Date.now()}`;
  },
  // بهینه‌سازی فایل‌های استاتیک
  compress: true,
  poweredByHeader: false,
  // بهینه‌سازی bundle
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'react-icons'],
  },
  // بهینه‌سازی webpack برای کاهش bundle size
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // بهینه‌سازی برای client-side bundle
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            // جدا کردن react-icons به صورت lazy
            reactIcons: {
              name: 'react-icons',
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              chunks: 'async', // فقط async chunks - lazy load
              priority: 30,
              enforce: true,
            },
            // جدا کردن antd
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              chunks: 'all',
              priority: 25,
              reuseExistingChunk: true,
            },
            // جدا کردن ant-design/icons به صورت lazy
            antdIcons: {
              name: 'antd-icons',
              test: /[\\/]node_modules[\\/]@ant-design[\\/]icons[\\/]/,
              chunks: 'async', // lazy load
              priority: 30,
              enforce: true,
            },
            // جدا کردن کتابخانه‌های بزرگ به صورت جداگانه
            mui: {
              name: 'mui',
              test: /[\\/]node_modules[\\/]@mui[\\/]/,
              chunks: 'async', // lazy load
              priority: 25,
              enforce: true,
            },
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },
            swiper: {
              name: 'swiper',
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },
            leaflet: {
              name: 'leaflet',
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },
            sweetalert2: {
              name: 'sweetalert2',
              test: /[\\/]node_modules[\\/]sweetalert2[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },
            // vendor libraries دیگر
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              minChunks: 2, // فقط کتابخانه‌هایی که در 2+ جا استفاده می‌شوند
            },
            // جدا کردن common chunks - محدود کردن اندازه
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              maxSize: 244000, // محدود کردن اندازه common به 244KB (قبلاً 5.9MB بود)
            },
          },
        },
      };
      
      // react-icons به صورت خودکار tree-shaking می‌شود با optimizePackageImports
      // نیازی به alias نیست
    }
    return config;
  },
  // Headers برای کش بهتر فایل‌های استاتیک
  async headers() {
    return [
      {
        source: '/font/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/style/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;