import cls from './Button.module.scss';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
    'aria-label': string,
    title: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
}

export const Button = ({
                           children,
                           'aria-label': ariaLabel,
                           title,
                           disabled,
                           type = 'button',
                           ...otherProps
                       }: ButtonProps) => {
    return (
        <button
            {...otherProps}
            disabled={disabled}
            aria-disabled={disabled ? 'true' : 'false'}
            type={type}
            aria-label={ariaLabel}
            title={title}
            className={cls.Button}
        >
            {children}
        </button>
    );
};

Button.displayName = 'Button';
