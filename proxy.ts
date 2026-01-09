import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function proxy(req: NextRequest) {
    const nonce = crypto.randomBytes(16).toString('base64');

    const csp = `
            default-src 'self';
            script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com 'strict-dynamic';
            script-src-elem 'self' 'nonce-${nonce}' https://www.googletagmanager.com;
            script-src-attr 'none';
            style-src 'self' https://fonts.googleapis.com;
            style-src-elem 'self' https://fonts.googleapis.com;
            style-src-attr 'unsafe-inline';
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' data:;
            connect-src 'self' ws://localhost:3000;
            frame-src 'self' https://www.googletagmanager.com;
            form-action 'self';
            frame-ancestors 'none';
            block-all-mixed-content;
            upgrade-insecure-requests;
    `;

    const res = NextResponse.next();

    res.headers.set(
        'Content-Security-Policy',
        csp.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim()
    );
    res.headers.set('x-nonce', nonce);

    return res;
}
