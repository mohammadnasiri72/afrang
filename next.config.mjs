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
};

export default nextConfig;