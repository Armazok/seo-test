'use client';

import { Button } from '@/ui';
import { useId } from 'react';
import Link from 'next/dist/client/link';
import { Image } from 'next/dist/client/image-component';

export default function Home() {
    const buttons = [
        {label: 'Button 1', id: useId(), tabIndex: 2},
        {label: 'Button 2', id: useId(), tabIndex: 0},
        {label: 'Button 3', id: useId(), tabIndex: 1},
    ];

    return (
        <div role='main'>
            <h1>SEO Test</h1>
            {buttons.map(({label, id, tabIndex}) => (
                <Button
                    key={id}
                    aria-label={label}
                    title={label}
                    disabled={false}
                    tabIndex={tabIndex}
                >
                    {label}
                </Button>
            ))}
            <Link title={'Переход на страницу private'} href={'/private'}>Private Link</Link>
            <Image
                fetchPriority={'high'}
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s'}
                alt={'На картинке изображен персонаж Disney Стич'}
                title={'На картинке изображен персонаж Disney Стич'}
                width={275}
                height={183}
            />
        </div>
    );
}
