'use client';

import { type DetailedHTMLProps, type InputHTMLAttributes, memo, useId } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const Input = memo(({label,...otherProps}: InputProps) => {
    const id = useId();

    return (
        <label htmlFor={id}>
            {label}
            <input {...otherProps} id={id} type="text"/>
        </label>
    );
});

Input.displayName = 'Input'
