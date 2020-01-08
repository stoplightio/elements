import * as React from 'react';
import { IProjectNode } from '../../types';
import { Drawer } from './Drawer';
import { NodeList } from './List';
import { SearchBar } from './SearchBar';

interface ISearchComponent {
  query: string;
  onChange: (query: string) => void; // TODO: Is this correct?
  nodes: IProjectNode[];
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  loadMore: any; // TODO: Type this
  isLoading: any; // TODO: Type this
  error?: any; // TODO: Type this
}

export const Search: React.FunctionComponent<ISearchComponent> = ({
  query,
  onChange,
  nodes,
  isOpen,
  onClose,
  onReset,
  loadMore,
  isLoading,
  error,
}) => {
  return (
    <Drawer className="Search__drawer" backdropClassName="Search__backdrop" isOpen={isOpen} onClose={onClose}>
      <>
        <SearchBar query={query} onChange={onChange} onReset={onReset} />

        <NodeList loading={isLoading} error={error} data={nodes} loadMore={loadMore} />
      </>
    </Drawer>
  );
};
