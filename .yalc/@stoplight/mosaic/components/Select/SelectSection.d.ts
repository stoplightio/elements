import { CollectionChildren } from '@react-types/shared';
import { ReactElement } from 'react';
import { PartialSpectrumCollectionNode } from '../../utils';
import { SelectSectionProps } from './types';
declare type SelectSectionPropsWithChildren = SelectSectionProps & {
    children: CollectionChildren<object>;
};
export declare function SelectSection(props: SelectSectionPropsWithChildren): ReactElement;
export declare namespace SelectSection {
    var getCollectionNode: (props: SelectSectionPropsWithChildren) => Generator<PartialSpectrumCollectionNode<object>, any, unknown>;
}
export declare const isSelectSection: (item: unknown) => item is SelectSectionProps;
export {};
