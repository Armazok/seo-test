'use server';

import type { Metadata } from 'next';
import { getProductById } from '@/app/product/[id]/model/getProductById';
import { Product } from '@/components/ProductsList/Product/Product';

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const {id} = await params
    const productById = await getProductById({id: id});

    return {
        title: `Товар ${productById.title}`,
        description: `Товар с категорией ${productById.category}, под брендом ${productById.brand}`,
        keywords: productById.tags.map(p => p).join(', '),
    };
}

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;

    const productById = await getProductById({id: id});

    return (
        <article role={'article'}>
            <Product p={productById}/>
        </article>
    );
};

Page.displayName = 'Page';
