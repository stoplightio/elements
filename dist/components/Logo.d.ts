import { HeightVals, WidthVals } from '@stoplight/mosaic';
import * as React from 'react';
interface LogoProps {
    logo: {
        altText: string;
        url?: string;
        backgroundColor?: string;
        href?: string;
    };
    h?: HeightVals;
    w?: WidthVals;
}
export declare const Logo: React.FC<LogoProps>;
export {};
