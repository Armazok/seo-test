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
    const products = await getAllProducts({});

    return (
        <section role={'main'} aria-label={'Главная страница продуктов'}>
            <h1 aria-label={'Наши продукты для слабовидящих людей'}>Наши продукты</h1>
            <ProductsList products={products}/>
        </section>
    );
};

Page.displayName = 'Page Products';
