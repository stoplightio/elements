import { SingleSelectListState } from '@react-stately/list';
import { TabListProps } from '../react-types-tabs';
export interface TabListState<T> extends SingleSelectListState<T> {
}
export declare function useTabListState<T extends object>(props: TabListProps<T>): TabListState<T>;
