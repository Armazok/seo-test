import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // CSP с внешним GTM, Google Fonts и всеми ресурсами
                    {
                        key: 'Content-Security-Policy',
                        value: `
              default-src 'self';
              script-src 'self' https://www.googletagmanager.com 'strict-dynamic';
              style-src 'self' https://fonts.googleapis.com;
              img-src 'self' data:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self';
              frame-ancestors 'none';
              base-uri 'none';
              object-src 'none';
              require-trusted-types-for 'script';
            `.replace(/\s{2,}/g, ' ').trim(),
                    },

                    // Защита от clickjacking
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },

                    // COOP — изоляция контекста
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
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
