import * as React from 'react';
import { Scrollbar, ScrollbarProps } from 'react-scrollbars-custom';
export declare type ScrollbarRefInstance = HTMLDivElement | Scrollbar | null;
export declare type ScrollbarRef = (instance: ScrollbarRefInstance) => void;
interface IScrollContainer extends Omit<ScrollbarProps, 'ref'> {
    shadows?: boolean;
    autosize?: boolean;
}
declare const ScrollContainer: React.ForwardRefExoticComponent<IScrollContainer & React.RefAttributes<ScrollbarRefInstance>>;
export { IScrollContainer, ScrollContainer };
