/// <reference types="react" />
import { BoxOwnProps } from '../Box/types';
export declare type ProductImageFocusVals = 'top' | 'bottom' | 'center' | 'top-right' | 'top-left';
export declare type ProductImageOwnProps = {
    focus?: ProductImageFocusVals;
    caption?: string;
};
export declare type ProductImageProps = BoxOwnProps & ProductImageOwnProps;
export declare function ProductImage({ className, children, focus, caption, bg, ...props }: ProductImageProps): JSX.Element;
