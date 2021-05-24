import { PartialNode } from '@react-stately/collections';
import { ItemProps } from '@react-types/shared';
import { ReactElement } from 'react';
export declare function Item<T>(props: ItemProps<T>): ReactElement;
export declare namespace Item {
    var getCollectionNode: <T>(props: ItemProps<T> & {
        id?: string;
        value?: string;
    }, context: any) => Generator<PartialNode<T>, any, unknown>;
}
