import React from 'react';
import { IFlexShorthandProps } from '../../enhancers/flex';
import { PolymorphicComponentProps } from '../Box';
export declare type FlexOwnProps = IFlexShorthandProps & {
    /**
     * If `true`, will render as `inline-flex` rather than `flex`
     */
    inline?: boolean;
};
export declare type FlexProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, FlexOwnProps>;
declare const defaultElement = "div";
export declare const Flex: <E extends React.ElementType = typeof defaultElement>(props: FlexProps<E>) => JSX.Element;
export {};
