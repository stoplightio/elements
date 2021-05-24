/// <reference types="react" />
import { BoxProps } from '../Box/types';
export declare type AspectRatioOwnProps = {
    /**
     * The aspect ratio of the Box. Common values are:
     *
     * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
     */
    ratio?: number;
};
export declare type AspectRatioProps = AspectRatioOwnProps & BoxProps<'div'>;
export declare function AspectRatio({ ratio, className, children, style, ...props }: AspectRatioProps): JSX.Element;
