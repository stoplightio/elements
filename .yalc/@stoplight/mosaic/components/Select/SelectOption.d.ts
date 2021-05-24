import React from 'react';
import { PartialSpectrumCollectionNode } from '../../utils';
import { SelectOptionProps } from './types';
export declare const SelectOption: {
    (_props: SelectOptionProps): React.ReactElement;
    getCollectionNode(props: SelectOptionProps): Generator<PartialSpectrumCollectionNode<object>>;
};
export declare const isSelectOption: (item: unknown) => item is SelectOptionProps;
