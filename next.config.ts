import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' }, // clickjacking
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }, // изоляция
                ],
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
        ],
    },
};

export default nextConfig;
