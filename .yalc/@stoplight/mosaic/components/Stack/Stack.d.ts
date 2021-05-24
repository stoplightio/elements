import './style.css';
import React from 'react';
import { IFlexShorthandProps } from '../../enhancers';
import { PolymorphicComponentProps } from '../Box';
export declare type StackOwnProps = Pick<IFlexShorthandProps, 'align' | 'justify' | 'wrap'> & {
    /**
     * The direction to render the stack
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * The space between each stack item
     */
    spacing?: 2 | 3 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 32;
    /**
     * If `true`, each stack item will show a divider
     */
    divider?: true | React.ReactElement;
    /**
     * If `true`, will render as `inline-flex` rather than `flex`
     */
    inline?: boolean;
};
export declare type StackProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, StackOwnProps>;
declare const defaultElement = "div";
export declare const Stack: <E extends React.ElementType = typeof defaultElement>(props: StackProps<E>) => JSX.Element;
export declare const HStack: <E extends React.ElementType = typeof defaultElement>(props: StackProps<E>) => JSX.Element;
export declare const VStack: <E extends React.ElementType = typeof defaultElement>(props: StackProps<E>) => JSX.Element;
export {};
