import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Head from 'next/dist/shared/lib/head';
import Script from 'next/dist/client/script';
import './globals.scss';
import { headers } from 'next/dist/server/request/headers';

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

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    const headersList = await headers();
    const nonce = headersList.get('x-nonce') ?? '';

    return (
        <html lang="ru">
        <Head>
            {/*Google Analytics*/}
            <Script
                nonce={nonce}
                async src="https://www.googletagmanager.com/gtag/js?id=G-MJKXP17LRC"
            />
            <Script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MJKXP17LRC');`
                }}
            />

            {/* Google Search Console */}
            <Script
                nonce={nonce}
                id="gtm-script"
                strategy="afterInteractive"
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
        {/* Google Search Console (noscript) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-54M87R22"
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
        </noscript>
        {children}
        </body>
        </html>
    );
}
