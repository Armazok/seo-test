import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(req: NextRequest) {
    const nonce = crypto.randomBytes(16).toString('base64');


    const csp = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com;
  script-src-elem 'self' 'nonce-${nonce}' https://www.googletagmanager.com;
  script-src-attr 'none';
  style-src 'self' https://fonts.googleapis.com;
  style-src-elem 'self' https://fonts.googleapis.com;
  style-src-attr 'none';
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
  frame-src 'self' https://www.googletagmanager.com;
  form-action 'self';
  frame-ancestors 'none';
  base-uri 'none';
  object-src 'none';
  require-trusted-types-for 'script';
  trusted-types nextjs next-router;
  sandbox allow-scripts allow-same-origin;
  block-all-mixed-content;
`.replace(/\s{2,}/g, ' ').trim();

    const res = NextResponse.next();

    res.headers.set('Content-Security-Policy', csp);
    res.headers.set('x-nonce', nonce);

    return res;
}
