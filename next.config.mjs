/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afrangadmin.aitest2.ir',
        port: '',
        pathname: '/**',
      },
    ],
  },
  generateBuildId: async () => {
    return `${Date.now()}`;
  },
};

export default nextConfig;