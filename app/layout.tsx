import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { headers } from 'next/dist/server/request/headers';
import { Header } from '@/widgets';
import './globals.scss';

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
                alt: '',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s',
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
        images: [ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s' ],
        creator: '@yourtwitter',
    },
    icons: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s',
    metadataBase: new URL('https://seo-test-ivory.vercel.app'),
    alternates: {
        canonical: 'https://seo-test-ivory.vercel.app/products',
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
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/*Schema*/}
        <Script
            nonce={nonce}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    'name': 'SEO Test Site',
                    'url': 'https://seo-test-ivory.vercel.app',
                    'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s',
                    'author': {
                        '@type': 'Person',
                        'name': 'Nikolay',
                        'url': 'https://github.com/Armazok'
                    }
                })
            }}
        />

        {/*Google Analytics*/}
        <Script
            nonce={nonce}
            async src="https://www.googletagmanager.com/gtag/js?id=G-MJKXP17LRC"
        />
        <Script
            nonce={nonce}
            strategy="afterInteractive"
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
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-54M87R22');`,
            }}
        />

        {/* Google Search Console (noscript) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-54M87R22"
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
        </noscript>
        <Header/>
        {children}
        </body>
        </html>
    );
}
