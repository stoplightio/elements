import * as React from 'react';
import * as ReactWindow from 'react-window';
export declare const CustomScrollContainer: React.ForwardRefExoticComponent<IFixedSizeListProps & {
    listHeight: number;
    scrollbarWidth?: number | undefined;
} & React.RefAttributes<HTMLDivElement>>;
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
    className?: string;
    maxRows?: number;
    autoSize?: boolean;
    instanceRef?: React.Ref<ReactWindow.FixedSizeList>;
}
declare const FixedSizeList: React.FunctionComponent<IFixedSizeListProps>;
interface IVariableSizeListProps extends Omit<ReactWindow.VariableSizeListProps, 'height' | 'width'> {
    className?: string;
    instanceRef?: React.Ref<ReactWindow.VariableSizeList>;
}
declare const VariableSizeList: React.FunctionComponent<IVariableSizeListProps>;
export { areEqual, shouldComponentUpdate, ListItemKeySelector, FixedSizeList as IFixedSizeList, VariableSizeList as IVariableSizeList, } from 'react-window';
export { IFixedSizeListProps, FixedSizeList, IVariableSizeListProps, VariableSizeList };
