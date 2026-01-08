import type { NextConfig } from 'next';
import crypto from 'crypto';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Генерация CSP с nonce для inline-скриптов
                    {
                        key: 'Content-Security-Policy',
                        value: (() => {
                            // Генерация случайного nonce
                            const nonce = crypto.randomBytes(16).toString('base64');

                            // CSP
                            return `
                default-src 'self';
                script-src 'nonce-${nonce}' https://www.googletagmanager.com 'strict-dynamic';
                style-src 'self';
                img-src 'self' data:;
                font-src 'self';
                connect-src 'self';
                frame-ancestors 'none';
                base-uri 'none';
                object-src 'none';
                require-trusted-types-for 'script';
              `.replace(/\s{2,}/g, ' ').trim();
                        })(),
                    },

                    // COOP — изоляция контекста
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },

                    // XFO — защита от clickjacking
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
