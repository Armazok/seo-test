import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
              default-src 'self';
              script-src 'self' https://www.googletagmanager.com;
              style-src 'self' https://fonts.googleapis.com;
              img-src 'self' data:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self';
              frame-ancestors 'none';
              base-uri 'none';
              object-src 'none';
            `.replace(/\s{2,}/g, ' ').trim(),
                    },
                    {key: 'X-Frame-Options', value: 'DENY'},
                    {key: 'Cross-Origin-Opener-Policy', value: 'same-origin'},
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
