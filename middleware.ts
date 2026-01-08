import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const nonce = Buffer.from(
        crypto.getRandomValues(new Uint8Array(16))
    ).toString('base64');

    const csp = `
  default-src 'self';

  script-src 
    'self' 
    'nonce-${nonce}' 
    'strict-dynamic' 
    https://www.googletagmanager.com;

  script-src-elem 
    'self' 
    'nonce-${nonce}' 
    https://www.googletagmanager.com;

  script-src-attr 'none';

  style-src 
    'self' 
    https://fonts.googleapis.com;

  style-src-elem 
    'self' 
    https://fonts.googleapis.com;

  style-src-attr 'none';          # закрыто для inline

  font-src 'self' https://fonts.gstatic.com;

  img-src 'self' data:;

  connect-src 'self';

  frame-src 'none';               # запрещены все iframe
  frame-ancestors 'none';

  form-action 'self';
  base-uri 'none';
  object-src 'none';

  navigate-to 'self';             # запрещён javascript: и внешние навигации

  require-trusted-types-for 'script';
  trusted-types nextjs next-router;
`.replace(/\s{2,}/g, ' ').trim();

    const res = NextResponse.next();

    res.headers.set('Content-Security-Policy', csp);
    res.headers.set('x-nonce', nonce);

    return res;
}
