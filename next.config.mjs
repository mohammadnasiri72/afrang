/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['afrangadmin.aitest2.ir', 'afrangdigital.com'],
  },
  // تنظیمات برای حل مشکل فایل‌های استاتیک
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://afrang.aitest2.ir' : '',
  basePath: '',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
