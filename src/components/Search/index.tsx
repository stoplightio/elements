import { Drawer } from '@stoplight/ui-kit';
import * as React from 'react';

import { IBranchNode } from '../../types';
import { NodeList } from './List';
import { SearchBar } from './SearchBar';

export interface ISearchComponent {
  query?: string;
  placeholder?: string;
  nodes?: IBranchNode[];
  isLoading?: boolean;
  isOpen?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  onReset?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  error?: Error;
}

export const Search: React.FC<ISearchComponent> = ({
  query,
  placeholder,
  onChange,
  nodes,
  isLoading,
  isOpen,
  onClose,
  onReset,
  error,
}) => {
  return (
    <Drawer className="Search__drawer" backdropClassName="Search__backdrop" isOpen={isOpen} onClose={onClose}>
      <SearchBar placeholder={placeholder} query={query} onChange={onChange} onReset={onReset} onClose={onClose} />

      <NodeList isLoading={isLoading} error={error} nodes={nodes} onReset={onReset} onClose={onClose} />
    </Drawer>
  );
};
