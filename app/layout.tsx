import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
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
    alternates: {
        canonical: 'https://seo-test-ivory.vercel.app/',
    },
    other: {
        'google-site-verification':
            'lwtLIeqFzqONXZlORR181sAQS4erVF7p8p9mIEqV110',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        </body>
        </html>
    );
}
