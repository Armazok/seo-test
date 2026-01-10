'use client';

import { redirect } from 'next/dist/client/components/redirect';
import { ROUTE } from '@/constants';

export default function Home() {
    return redirect(ROUTE.PRODUCTS);
}
