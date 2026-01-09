'use server';

import type { Metadata } from 'next';
import { getProductById } from '@/app/product/[id]/model/getProductById';
import { Product } from '@/components/ProductsList/Product/Product';

export async function generateMetadata(): Promise<Metadata> {
    const productById = await getProductById({id: 1});

    return {
        title: `Товар ${productById.title}`,
        description: `Товар с категорией ${productById.category}, под брендом ${productById.brand}`,
        keywords: productById.tags.map(p => p).join(', '),
    };
}

export default async function Page() {
    const productById = await getProductById({id: 1});

    return (
        <article role={'article'}>
            <Product p={productById}/>
        </article>
    );
};

Page.displayName = 'Page';
