import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function proxy(req: NextRequest) {
    const res = NextResponse.next();

    const nonce = crypto.randomBytes(16).toString('base64');
    const isDev = process.env.NODE_ENV !== 'production';

    const csp = `
  default-src 'self';
  script-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`} https://www.googletagmanager.com 'strict-dynamic';
  script-src-elem 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`} https://www.googletagmanager.com;
  script-src-attr 'none';
  style-src 'self' https://fonts.googleapis.com ${isDev ? "'unsafe-inline'" : ""};
  style-src-elem 'self' ${isDev ? "'unsafe-inline'" : ""};
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

    res.headers.set(
        'Content-Security-Policy',
        csp.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim()
    );

    // nonce для вставки inline скриптов в prod
    res.headers.set('x-nonce', nonce);

    return res;
}
