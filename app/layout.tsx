import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Head from 'next/dist/shared/lib/head';
import Script from 'next/dist/client/script';
import './globals.scss';
import { randomBytes } from 'crypto';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: [ 'latin' ],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: [ 'latin' ],
});

export const metadata: Metadata = {
    title: 'Рекомендуемая длина составляет от 30 до 60 символов',
    description: 'Рекомендуемое описание составляет от 120 символов до 320 символов, тут мы сделаем заглушку из Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque dignissimos eos harum, ipsum iure laborum molestiae nihil nisi optio perspiciatis quod quos, repudiandae saepe tempore unde vel, vero voluptas?',
    openGraph: {
        title: 'SEO Test',
        description: 'Test SEO configuration in Next.js App Router',
        url: 'https://seo-test-ivory.vercel.app',
        siteName: 'SEO Test Site',
        images: [
            {
                url: 'https://seo-test-ivory.vercel.app/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO Test',
        description: 'Test SEO configuration in Next.js App Router',
        images: [ 'https://seo-test-ivory.vercel.app/og-image.png' ],
        creator: '@yourtwitter',
    },
    metadataBase: new URL('https://seo-test-ivory.vercel.app'),
    alternates: {
        canonical: 'https://seo-test-ivory.vercel.app/',
    },
    other: {
        'google-site-verification':
            'lwtLIeqFzqONXZlORR181sAQS4erVF7p8p9mIEqV110',
    },
    authors: [
        {name: 'Nikolay', url: 'https://github.com/Armazok'}
    ],
    publisher: 'Armazok',
    robots: {
        index: true,
        follow: true,
    },
    keywords: [ 'Next.js', 'SEO', 'robots', 'sitemap', 'frontend' ]
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    const nonce = randomBytes(16).toString('base64');

    const csp = `
    default-src 'self';
    script-src 'nonce-${nonce}' https://www.googletagmanager.com 'strict-dynamic';
    style-src 'self' https://fonts.googleapis.com;
    img-src 'self' data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'none';
    object-src 'none';
    require-trusted-types-for 'script';
  `.replace(/\s{2,}/g, ' ').trim();

    return (
        <html lang="en">
        {/* Google Tag Manager */}
        <Head>
            <meta httpEquiv="Content-Security-Policy" content={csp} />
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                nonce={nonce}
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-54M87R22');`,
                }}
            />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-54M87R22"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
        </noscript>
        {children}
        </body>
        </html>
    );
}
