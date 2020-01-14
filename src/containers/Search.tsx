import * as React from 'react';
import { Search as SearchComponent } from '../components/Search';
import { useProjectNodes } from '../hooks';

export interface ISearchContainer {
  srn: string;
  isOpen?: boolean;
  onClose?: () => void;
  group?: string;
}

export const Search: React.FunctionComponent<ISearchContainer> = ({ srn, isOpen, onClose, group }) => {
  const [query, updateQuery] = React.useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    updateQuery(e.target.value);
  }

  function handleReset(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.persist();
    updateQuery('');
  }

  const options = { group, query };
  const { data, error, isLoading } = useProjectNodes(srn, options);

  return (
    <SearchComponent
      query={query}
      onChange={handleChange}
      nodes={data.items}
      isOpen={isOpen}
      onClose={onClose}
      onReset={handleReset}
      isLoading={isLoading}
      error={error}
    />
  );
};
