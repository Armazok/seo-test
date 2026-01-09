'use client';

import { type DetailedHTMLProps, type InputHTMLAttributes, useId } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const Input = ({label,...otherProps}: InputProps) => {
    const id = useId();

    return (
        <label htmlFor={id}>
            {label}
            <input {...otherProps} id={id} type="text"/>
        </label>
    );
};

Input.displayName = 'Input'
