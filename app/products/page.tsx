'use server';

import { getAllProducts } from '@/app/products/model/getAllProducts';
import type { Metadata } from 'next';
import { ProductsList } from '@/components';
import Script from 'next/dist/client/script';
import { headers } from 'next/dist/server/request/headers';

export async function generateMetadata(): Promise<Metadata> {
    const products = await getAllProducts({});

    return {
        title: `Наши товары в количестве ${products.total}`,
        description: `У нас в наличие ${products.products.map(p => p.title).join(', ')}`,
        keywords: products.products.map(p => p.title).join(', '),
    };
}

export default async function Page() {
    const products = await getAllProducts({});
    const headersList = await headers();
    const nonce = headersList.get('x-nonce') ?? '';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Наши продукты',
        'mainEntity': {
            '@type': 'ItemList',
            'numberOfItems': products.total,
            'itemListElement': products.products.map((p, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'item': {
                    '@type': 'Product',
                    'name': p.title,
                    'url': `https://seo-test-ivory.vercel.app/products/${p.id}`,
                }
            }))
        }
    }

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Наши продукты',
                'item': 'https://seo-test-ivory.vercel.app/products'
            },
            ...products.products.map((p, index) => ({
                '@type': 'ListItem',
                'position': index + 2,
                'item': {
                    '@type': 'Product',
                    'name': p.title,
                    'url': `https://seo-test-ivory.vercel.app/products/${p.id}`
                }
            }))
        ]
    }

    return (
        <>
            <Script
                nonce={nonce}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <Script
                nonce={nonce}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <section role={'main'} aria-label={'Главная страница продуктов'}>
                <h1 aria-label={'Наши продукты для слабовидящих людей'}>Наши продукты</h1>
                <ProductsList products={products}/>
            </section>
        </>
    );
};

Page.displayName = 'Page Products';
