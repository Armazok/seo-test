import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const nonce = Buffer.from(
        crypto.getRandomValues(new Uint8Array(16))
    ).toString('base64');

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
  frame-src https://www.googletagmanager.com;
  form-action 'self';
  frame-ancestors 'none';
  base-uri 'none';
  object-src 'none';
  require-trusted-types-for 'script';
  trusted-types nextjs next-router;
  sandbox allow-scripts allow-same-origin; /* если нужно iframe */
  unsafe-eval 'none';       /* блокирует eval() */
  block-all-mixed-content;  /* для безопасности iframe/css */
`.replace(/\s{2,}/g, ' ').trim();

    // navigate-to 'self';        /* запрет навигации на javascript: URL */

    const res = NextResponse.next();

    res.headers.set('Content-Security-Policy', csp);
    res.headers.set('x-nonce', nonce);

    return res;
}
