import { HTMLAttributes, RefObject } from 'react';
import { TabListState } from '../react-stately-tabs';
import { AriaTabPanelProps } from '../react-types-tabs';
interface TabPanelAria {
    /** Props for the tab panel element. */
    tabPanelProps: HTMLAttributes<HTMLElement>;
}
export declare function useTabPanel<T>(props: AriaTabPanelProps, state: TabListState<T>, ref: RefObject<HTMLElement>): TabPanelAria;
export {};
