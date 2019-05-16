import * as React from 'react';
import { ScrollbarProps } from 'react-scrollbars-custom';
interface IScrollContainer extends ScrollbarProps {
    shadows?: boolean;
    autosize?: boolean;
}
declare const ScrollContainer: React.FunctionComponent<IScrollContainer>;
export { IScrollContainer, ScrollContainer };
