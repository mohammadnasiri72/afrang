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
  },
  generateBuildId: async () => {
    return `${Date.now()}`;
  },
  
  // ✅ غیرفعال کردن prefetch فقط برای صفحات product و products
  experimental: {
    // برای مدیریت بهتر کش
    staleTimes: {
      dynamic: 60,
      static: 3600,
    },
  },
  
  // ✅ بهینه‌سازی build
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // ✅ غیرفعال کردن source maps برای کاهش حجم
  productionBrowserSourceMaps: false,
  
  // ✅ تنظیمات کش برای فایل‌های استاتیک
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
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
    ];
  },
};

export default nextConfig;