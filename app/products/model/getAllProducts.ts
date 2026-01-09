'use server';

import type { ProductsType } from './typeProducts';

type getAllProductsType = {
    limit?: number;
    skip?: number;
}
export const getAllProducts = async ({limit = 30, skip = 0}: getAllProductsType): Promise<ProductsType> => {
    let res = await fetch(process.env.DB_HOST_DUMMY + `/products?limit=${limit}&skip=${skip}`, {cache: 'no-cache'});

    if (!res.ok) {
        throw new Error('Product not found');
    }

    return await res.json();
};

