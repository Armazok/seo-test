'use server';

import { getAllProducts } from '@/app/products/model/getAllProducts';
import type { Metadata } from 'next';
import { ProductsList } from '@/components';

export async function generateMetadata(): Promise<Metadata> {
    const products = await getAllProducts({});

    return {
        title: `Наши товары в количестве ${products.total}`,
        description: `У нас в наличие ${products.products.map(p => p.title).join(', ')}`,
        keywords: products.products.map(p => p.title).join(', '),
    };
}

export default async function Page() {
    const products = await getAllProducts({})

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
                    'url': `https://your-site.com/products/${p.id}`,
                }
            }))
        }
    }
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
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
