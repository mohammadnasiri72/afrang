/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
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
    },
    experimental: {
        optimizePackageImports: ['@ant-design/icons', 'antd', 'react-icons'],
        serverActions: {
            allowedOrigins: ['afrang.aitest2.ir', 'afrangdigital.com']
        }
    }
};

export default nextConfig;