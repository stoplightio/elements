import React, { CSSProperties } from 'react';
export declare type ProviderProps = {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
};
export declare const Provider: ({ children, className, style }: ProviderProps) => JSX.Element;
