import { SingleSelectListState } from '@react-stately/list';
import { HTMLAttributes, RefObject } from 'react';
import { AriaTabProps } from '../react-types-tabs';
interface TabAria {
    /** Props for the tab element. */
    tabProps: HTMLAttributes<HTMLElement>;
}
export declare function useTab<T>(props: AriaTabProps, state: SingleSelectListState<T>, ref: RefObject<HTMLElement>): TabAria;
export {};
