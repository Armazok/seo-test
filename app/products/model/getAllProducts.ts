'use server';

import type { ProductsType } from '@/app/products/model/typeProducts';

export const getAllProducts = async (): Promise<ProductsType> => {
    let res = await fetch(process.env.DB_HOST_DUMMY +'/products');

    if (!res.ok) {
        throw new Error('Product not found');
    }

    return await res.json();
};

