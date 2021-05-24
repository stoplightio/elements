declare type DefaultPseudoProps = 'sm' | 'md' | 'first' | 'last' | 'odd' | 'even' | 'hover' | 'focus' | 'active' | 'visited' | 'groupHover' | 'groupFocus' | 'disabled';
export declare type Pseudo<T, P extends DefaultPseudoProps> = {
    [key in P | 'default']?: T;
};
export declare const isNegative: (v: boolean | string | number) => boolean;
export declare const buildClassname: (p: string, v: boolean | string | number) => string;
export declare const computePseudoClasses: (prop: string, val: boolean | string | number | Pseudo<unknown, DefaultPseudoProps>) => string;
export {};
