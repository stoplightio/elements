export declare type HslColor2 = {
    h: number;
    s: number;
    l: number;
    a?: number;
};
export declare const getContrastColor: (bgLuminance: number, fgLuminance: number, targetContrast: number, hue: number, saturation?: number, lightness?: number) => string;
export declare const parseHsl: (hsl: string) => HslColor2;
export declare const stringifyHsl: (hsl: HslColor2) => string;
