'use server';

import type { ProductSearchByTitleType } from '@/app/products/model/typeSearchProductByTitle';

type searchProductByTitleType = {
    search: string;
}

export const searchProductByTitle = async ({search = ''}: searchProductByTitleType): Promise<ProductSearchByTitleType> => {
    let res = await fetch(process.env.DB_HOST_DUMMY + `/products/search?q=${search}`);

    if (!res.ok) {
        throw new Error('Product not found');
    }

    return await res.json();
};

