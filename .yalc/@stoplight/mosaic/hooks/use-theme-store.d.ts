import { ColorValues, ICustomTheme, ITheme, ThemeMode } from '../utils';
import { HslColor2 } from '../utils/color-manipulation';
export declare const THEME_STORAGE_KEY = "mosaic-theme";
export declare const DEFAULT_THEME_MODE = "light";
export declare type ThemeState = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    theme: ICustomTheme;
    setColor: (name: keyof ITheme['colors'], val: string | HslColor2) => void;
    reset: () => void;
    colorValues: Partial<ColorValues>;
    setColorValues: (cv: ColorValues) => void;
    invertedColorValues: Partial<ColorValues>;
    setInvertedColorValues: (cv: ColorValues) => void;
};
export declare const useThemeStore: import("zustand").UseStore<ThemeState>;
