import * as React from 'react';
import { Search as SearchComponent } from '../components/Search';
import { useProjectNodes } from '../hooks';

export interface ISearchContainer {
  srn: string;
  isOpen?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  group?: string;
}

export const Search: React.FunctionComponent<ISearchContainer> = ({ srn, isOpen, onClose, onReset, group }) => {
  const [query, updateQuery] = React.useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    updateQuery(e.target.value);
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
      onReset={onReset}
      isLoading={isLoading}
      error={error}
    />
  );
};
