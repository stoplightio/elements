import { Drawer } from '@stoplight/ui-kit';
import * as React from 'react';
import { IProjectNode } from '../../types';
import { NodeList } from './List';
import { SearchBar } from './SearchBar';

export interface ISearchComponent {
  query: string;
  onChange: (query: React.ChangeEvent<HTMLInputElement>) => void;
  nodes: IProjectNode[];
  isLoading: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  error?: {
    message: string;
  };
}

export const Search: React.FunctionComponent<ISearchComponent> = ({
  query,
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
      <>
        <SearchBar query={query} onChange={onChange} onReset={onReset} onClose={onClose} />

        <NodeList loading={isLoading} error={error} nodes={nodes} onReset={onReset} />
      </>
    </Drawer>
  );
};
