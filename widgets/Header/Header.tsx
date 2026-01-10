'use client';

import { useId } from 'react';
import { ROUTE } from '@/constants';
import cls from './Header.module.scss';

export const Header = () => {
    const navArr = [
        {id: useId(), label: 'Продуктовая', title: 'Переход на страницу Продуктовая', href: ROUTE.PRODUCTS},
        {id: useId(), label: 'Приватная', title: 'Переход на страницу Приватная', href: ROUTE.PRIVATE},
        {id: useId(), label: 'Форма', title: 'Переход на страницу Формы', href: ROUTE.FORM},
    ];

    return (
        <header className={cls.Header}>
            <nav className={cls.Header__nav}>
                <ul className={cls.Header__lists}>
                    {navArr.map(({id, href, title, label}) => {
                        return (
                            <li key={id} className={cls.Header__lists__list}>
                                <a title={title} href={href}>{label}</a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    );
};

Header.displayName = 'Header';
