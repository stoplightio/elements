import { HslColor2 } from './color-manipulation';
export declare type ThemeMode = 'light' | 'dark' | 'system';
declare type Color = string;
export interface ITheme {
    colors: {
        background: Color;
        text?: Color;
        primary: Color;
        success: Color;
        warning: Color;
        danger: Color;
    };
}
export interface ICustomTheme {
    colors: Partial<ITheme['colors']>;
}
export declare type ColorValues = {
    light?: boolean;
} & Record<keyof Omit<ITheme['colors'], 'modes'>, HslColor2>;
export declare const defaultTheme: ITheme;
export declare const getCssVariable: (name: string, element?: HTMLElement) => string;
export declare const prefersDarkMode: () => MediaQueryList;
/**
 * Handles figuring out what 'system' mode resolves to if user has that picked. Always returns light | dark.
 */
export declare const getResolvedThemeMode: (userMode: ThemeMode) => "light" | "dark";
export declare const computeTheme: (customTheme: ICustomTheme, $mode?: ThemeMode) => {
    mult: {
        s: number;
        l: number;
    };
    colorValues: ColorValues;
    invertedColorValues: ColorValues;
    css: string;
};
export {};
