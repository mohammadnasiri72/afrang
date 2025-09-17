/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['afrangadmin.aitest2.ir', 'afrangdigital.com'],
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