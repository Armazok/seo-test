'use client';

import type { ProductsType } from '@/app/products/model/typeProducts';
import { Product } from '@/components/ProductsList/Product/Product';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import type { ProductSearchByTitleType } from '@/app/products/model/typeSearchProductByTitle';
import { useDebounce } from '@/hook';
import { searchProductByTitle } from '@/app/products/model/searchProductByTitle';
import { Input } from '@/ui';
import { ROUTE } from '@/constants';

type ProductsListType = {
    products: ProductsType | ProductSearchByTitleType;
};

export const ProductsList = ({products}: ProductsListType) => {
    const {push} = useRouter();
    const [ searchValue, setSearchValue ] = useState<string>('');
    const [ items, setItems ] = useState<ProductsType | ProductSearchByTitleType>(products);
    const debouncedSearch = useDebounce(searchValue, 1500);

    useEffect(() => {
        const fetchData = async () => {
            if (!debouncedSearch) {
                setItems(products);
                return;
            }

            const res = await searchProductByTitle({search: debouncedSearch});
            setItems(res);
        };
        fetchData();
    }, [ debouncedSearch, products ]);

    const onClickProductById = useCallback((id: number) => {
        push(`${ROUTE.PRODUCT}/${id}`)
    }, [ push ]);

    const onChangeBySearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearchValue(value);
    }, [ push ]);

    return (
        <>
            <Input
                value={searchValue}
                onChange={onChangeBySearch}
                title={'Поиск продукта'}
                aria-label={'Поиск продукта по заголовку'}
                label={'Поиск продукта'}
                placeholder={'Поиск по заголовку'}
            />
            {items.products.map(p => (
                <Product onClick={() => onClickProductById(p.id)} key={p.id} p={p}/>
            ))}
        </>
    );
};

