import { SingleSelectListState } from '@react-stately/list';
import { Key } from 'react';
export declare const tabsIds: WeakMap<SingleSelectListState<unknown>, string>;
export declare function generateId<T>(state: SingleSelectListState<T>, key: Key, role: string): string;
