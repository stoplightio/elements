import { SingleSelectListState } from '@react-stately/list';
import { DOMProps, Node } from '@react-types/shared';
import React from 'react';
import { DensityVals } from './variants';
export declare type TabOwnProps = {
    children: React.ReactNode;
    /**
     * An optional unique identifier (within this <Tabs /> component) for the tab - must match up with the id of a corresponding <TabPanel />.
     */
    id?: string;
    isDisabled?: boolean;
};
export declare const Tab: {
    (props: TabOwnProps): JSX.Element;
    getCollectionNode: <T>(props: import("@react-types/shared").ItemProps<T> & {
        id?: string;
        value?: string;
    }, context: any) => Generator<import("@react-stately/collections").PartialNode<T>, any, unknown>;
};
interface TabProps<T> extends DOMProps {
    item: Node<T>;
    state: SingleSelectListState<T>;
    isDisabled?: boolean;
    density?: DensityVals;
}
export declare function TabImpl<T>(props: TabProps<T>): JSX.Element;
export {};
