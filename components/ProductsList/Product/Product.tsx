import type { ProductType } from '@/app/products/model/typeProducts';
import type { ProductByIDType } from '@/app/product/[id]/model/typeProductById';

interface ProductProps {
    p: ProductType | ProductByIDType;
}

export const Product = ({p}: ProductProps) => {
    return (
        <article aria-label={p.title} role={'article'}>
            <h2 aria-label={p.title} title={p.title}>{p.title}</h2>
            <p aria-label={p.description} title={p.description}>{p.description}</p>
        </article>
    );
};

Product.displayName = 'Product';
