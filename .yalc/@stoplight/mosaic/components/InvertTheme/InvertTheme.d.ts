import React from 'react';
export declare const InvertThemeContext: React.Context<{
    inverted?: boolean;
}>;
export declare const InvertTheme: ({ children, inverted }: {
    children: JSX.Element;
    inverted?: boolean;
}) => JSX.Element;
