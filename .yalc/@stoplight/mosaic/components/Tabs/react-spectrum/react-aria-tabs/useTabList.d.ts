import { HTMLAttributes } from 'react';
import { TabListState } from '../react-stately-tabs';
import { AriaTabListProps } from '../react-types-tabs';
interface TabListAria {
    /** Props for the tablist container. */
    tabListProps: HTMLAttributes<HTMLElement>;
}
export declare function useTabList<T>(props: AriaTabListProps<T>, state: TabListState<T>, ref: any): TabListAria;
export {};
