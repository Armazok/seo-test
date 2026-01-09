'use server';

import { getAllProducts } from '@/app/products/model/getAllProducts';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const products = await getAllProducts();

    return {
        title: `Наши товары в количестве ${products.total}`,
        description: `У нас в наличие ${products.products.map(p => p.title).join(', ')}`,
        keywords: products.products.map(p => p.title).join(', '),
    };
}

export default async function Page() {
    const products = await getAllProducts();

    return (
        <section role={'main'} aria-label={'Главная страница продуктов'}>
            <h1 aria-label={'Наши продукты для слабовидящих людей'}>Наши продукты</h1>
            {products.products.map(p => (
                <article aria-label={p.title} key={p.id} role={'article'}>
                    <h2 aria-label={p.title} title={p.title}>{p.title}</h2>
                    <p aria-label={p.description} title={p.description}>{p.description}</p>
                </article>
            ))}
        </section>
    );
};

Page.displayName = 'Page Products';
