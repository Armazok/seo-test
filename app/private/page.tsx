'use client';

import { Image } from 'next/dist/client/image-component';

export default function Page() {
    return (
        <div>
            Страница для робота которую он не должен ранжировать.

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
};

Page.displayName = 'Page';
