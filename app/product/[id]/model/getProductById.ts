'use server';

import type { ProductByIDType } from './typeProductById';

type getProductByIdType = {
    id: string;
}
export const getProductById = async ({id}: getProductByIdType): Promise<ProductByIDType> => {
    let res = await fetch(process.env.DB_HOST_DUMMY + `/products/${id}`, {cache: 'force-cache'});

    if (!res.ok) {
        throw new Error('Product not found');
    }

    return await res.json();
};

