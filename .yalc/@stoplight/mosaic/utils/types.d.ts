import { ItemRenderer } from '@react-types/shared';
import React from 'react';
export declare type MaybeRenderProp<P, R = React.ReactNode> = R | ((props: P) => R);
export declare type MaybeRenderPropWithState<P, S, R = React.ReactNode> = R | ((props: P, state: S) => R);
export declare type Placement = 'bottom' | 'bottom left' | 'bottom right' | 'top' | 'top left' | 'top right' | 'left' | 'left top' | 'left bottom' | 'right' | 'right top' | 'right bottom';
export interface PartialSpectrumCollectionNode<T> {
    type?: 'item' | 'section' | string;
    key?: React.Key;
    value?: T;
    element?: React.ReactElement;
    wrapper?: (element: React.ReactElement) => React.ReactElement;
    rendered?: React.ReactNode;
    textValue?: string;
    'aria-label'?: string;
    index?: number;
    renderer?: ItemRenderer<T>;
    hasChildNodes?: boolean;
    childNodes?: () => IterableIterator<PartialSpectrumCollectionNode<T>>;
    props?: any;
    shouldInvalidate?: (context: unknown) => boolean;
}
