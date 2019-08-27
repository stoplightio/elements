import { ItemPredicate, ItemRenderer, Suggest } from '@stoplight/ui-kit/Select';
import * as React from 'react';
import { HeaderField } from '../types';
export declare const HeaderSuggest: new (props: import("@stoplight/ui-kit/Select").ISuggestProps<HeaderField>) => Suggest<HeaderField>;
export declare const headerSuggestProps: (inFocus: {
    index: number;
    prop: string;
}, index: number) => {
    popoverProps: {
        targetClassName: string;
    };
    inputProps: {
        placeholder: string;
        autoFocus: boolean;
    };
    noResults: JSX.Element;
    inputValueRenderer: (headerField: HeaderField) => string;
    itemRenderer: ItemRenderer<HeaderField>;
    items: HeaderField[];
    itemPredicate: ItemPredicate<HeaderField>;
    createNewItemFromQuery: (query: string) => {
        name: string;
        description: string;
        example: string;
    };
    createNewItemRenderer: (query: string, active: boolean, handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void) => JSX.Element;
    openOnKeyDown: boolean;
};
