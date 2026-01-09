'use server';

import type { ProductByIDType } from './typeProductById';

type getProductByIdType = {
    id: number;
}
export const getProductById = async ({id}: getProductByIdType): Promise<ProductByIDType> => {
    let res = await fetch(process.env.DB_HOST_DUMMY + `/products/${id}`, {cache: 'no-cache'});

    if (!res.ok) {
        throw new Error('Product not found');
    }

    return await res.json();
};

