/// <reference types="react" />
import { ThemeMode } from './utils/theme';
export declare const GLOBAL_CSS_ID = "mosaic-global";
export declare const GLOBAL_CSS_THEME_ID = "mosaic-theme";
export declare const injectStyles: ({ mode }?: {
    mode?: ThemeMode;
}) => () => void;
export declare const subscribeTheme: ({ mode: initialMode }?: {
    mode?: ThemeMode;
}) => () => void;
export declare const InlineStyles: () => JSX.Element;
/**
 * Small snippet to set the basics re theme as early as possible during rendering, to avoid major flashes of white etc.
 */
export declare const INIT_THEME_JS: string;
export declare const InitTheme: () => JSX.Element;
