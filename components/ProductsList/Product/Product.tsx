'use client';

import type { ProductType } from '@/app/products/model/typeProducts';
import type { ProductByIDType } from '@/app/product/[id]/model/typeProductById';
import cls from './Product.module.scss';
import type { ProductSearchProductByTitle } from '@/app/products/model/typeSearchProductByTitle';
import { memo } from 'react';

interface ProductProps {
    p: ProductType | ProductByIDType | ProductSearchProductByTitle;
    onClick?: () => void;
}

export const Product = memo(({p, onClick}: ProductProps) => {
    return (
        <article onClick={onClick} className={cls.Product} aria-label={p.title} role={'article'}>
            <h2 className={cls.Product__title} aria-label={p.title} title={p.title}>{p.title}</h2>
            <p className={cls.Product__desc} aria-label={p.description} title={p.description}>{p.description}</p>
        </article>
    );
});

Product.displayName = 'Product';
