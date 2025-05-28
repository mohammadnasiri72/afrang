/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['afrangdigital.com', 'api.afrangdigital.com'],
        unoptimized: true
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.afrangdigital.com/:path*'
            }
        ]
    }
};

export default nextConfig;
