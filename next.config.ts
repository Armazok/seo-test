import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // CSP — защита от XSS
                    {
                        key: 'Content-Security-Policy',
                        value: `
              default-src 'self';
              script-src 'self' https://www.googletagmanager.com;
              style-src 'self';
              img-src 'self' data:;
              font-src 'self';
              connect-src 'self';
              frame-ancestors 'none';
              base-uri 'none';
              object-src 'none';
              require-trusted-types-for 'script';
            `
                            .replace(/\s{2,}/g, ' ')
                            .trim(),
                    },

                    // COOP — изоляция контекста
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },

                    // XFO — защита от clickjacking (альтернатива frame-ancestors)
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ]
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
