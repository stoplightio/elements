import { Omit } from '@stoplight/types';
import * as React from 'react';
import * as ReactWindow from 'react-window';
export declare const CustomScrollContainer: React.ForwardRefExoticComponent<IFixedSizeListProps & {
    listHeight: number;
} & React.RefAttributes<HTMLDivElement>>;
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
    className?: string;
    maxRows?: number;
}
declare const FixedSizeList: React.FunctionComponent<IFixedSizeListProps>;
export { areEqual, shouldComponentUpdate, ListItemKeySelector, FixedSizeList as IFixedSizeList } from 'react-window';
export { IFixedSizeListProps, FixedSizeList };
