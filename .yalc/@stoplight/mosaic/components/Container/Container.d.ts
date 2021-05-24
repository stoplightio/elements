import React from 'react';
import { IMarginProps, IPaddingProps, SpaceVals } from '../../enhancers';
import { IBoxHTMLAttributes } from '../Box/types';
export declare type ContainerSizeVals = 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export interface IContainerProps extends IMarginProps, IPaddingProps, IBoxHTMLAttributes {
    as?: React.ElementType;
    size?: ContainerSizeVals;
}
export declare const containerSizes: Record<ContainerSizeVals, {
    maxWidth?: number;
    p: SpaceVals;
}>;
export declare const Container: React.MemoExoticComponent<React.ForwardRefExoticComponent<IContainerProps & React.RefAttributes<HTMLDivElement>>>;
