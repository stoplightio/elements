import React from 'react';
import { PartialSpectrumCollectionNode } from '../../utils';
import { SelectActionProps } from './types';
export declare const SelectAction: {
    (_props: SelectActionProps): React.ReactElement;
    getCollectionNode(props: SelectActionProps): Generator<PartialSpectrumCollectionNode<object>>;
};
export declare const isSelectAction: (item: unknown) => item is SelectActionProps;
