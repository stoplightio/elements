import * as React from 'react';
import { IProjectNode } from '../../types';
import { Drawer } from './Drawer';
import { NodeList } from './List';
import { SearchBar } from './SearchBar';

interface ISearchComponent {
  query: string;
  onChange: (query: string) => void; // QUESTION: Is this correct? It becomes an issue when we try get to SearchBar as FormInput has a different type
  nodes: IProjectNode[];
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  isLoading: boolean;
  error?: any; // TODO: Type this
}

export const Search: React.FunctionComponent<ISearchComponent> = ({
  query,
  onChange,
  nodes,
  isOpen,
  onClose,
  onReset,
  isLoading,
  error,
}) => {
  return (
    <Drawer className="Search__drawer" backdropClassName="Search__backdrop" isOpen={isOpen} onClose={onClose}>
      <>
        <SearchBar query={query} onChange={onChange} onReset={onReset} />

        <NodeList loading={isLoading} error={error} data={nodes} onReset={onReset} />
      </>
    </Drawer>
  );
};
