'use client';

import { Image } from 'next/dist/client/image-component';
import StichStatick from '@/public/stichPublic.jpeg';

export default function Page() {
    return (
        <div>
            Страница для робота которую он не должен ранжировать.

            <div>
                <h2>Remote Image</h2>
                <Image
                    fetchPriority={'high'}
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&s'}
                    alt={'На картинке изображен персонаж Disney Стич'}
                    title={'На картинке изображен персонаж Disney Стич'}
                    width={275}
                    height={183}
                />
            </div>

            <div>
                <h2>Public Image</h2>
                <Image
                    fetchPriority={'high'}
                    src={'/stichPublic.jpeg'}
                    alt={'На картинке изображен персонаж Disney Стич'}
                    title={'На картинке изображен персонаж Disney Стич'}
                    width={275}
                    height={183}
                />
            </div>

            <div>
                <h2>Export Image</h2>
                <Image
                    fetchPriority={'high'}
                    src={StichStatick}
                    alt={'На картинке изображен персонаж Disney Стич'}
                    title={'На картинке изображен персонаж Disney Стич'}
                />
            </div>

        </div>
    );
};

Page.displayName = 'Page';
