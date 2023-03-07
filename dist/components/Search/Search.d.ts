import { ModalProps } from '@stoplight/mosaic';
import * as React from 'react';
import { NodeSearchResult } from '../../types';
export declare type SearchProps = {
    isLoading?: boolean;
    search?: string;
    searchResults?: NodeSearchResult[];
    onSearch: (search: string) => void;
    onClick: (result: NodeSearchResult) => void;
    isOpen?: boolean;
    onClose: ModalProps['onClose'];
};
export declare const Search: React.FC<SearchProps>;
