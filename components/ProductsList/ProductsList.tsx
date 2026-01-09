'use client';

import type { ProductsType } from '@/app/products/model/typeProducts';
import { Product } from '@/components/ProductsList/Product/Product';
import { Input } from '@/ui';

type ProductsListType = {
    products: ProductsType;
};

export const ProductsList = ({products}: ProductsListType) => {
    return (
        <>
            <Input
                title={'Поиск продукта'}
                aria-label={'Поиск продукта по заголовку'}
                label={'Поиск продукта'}
                placeholder={'Поиск по заголовку'}
            />
            {products.products.map(p => (
                <Product key={p.id} p={p}/>
            ))}
        </>
    );
};

