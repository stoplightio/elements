import * as React from 'react';

import { Search as SearchComponent } from '../components/Search';
import { useDebounce } from '../hooks';
import { useProjectSearch } from '../hooks/useProjectSearch';

export interface ISearchContainer {
  srn: string;
  placeholder?: string;
  limit?: number;
  isOpen?: boolean;
  onClose?: () => void;
  group?: string;
}

export const Search: React.FC<ISearchContainer> = ({ placeholder, srn, isOpen, onClose, group, limit }) => {
  const [query, updateQuery] = React.useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, isValidating, error } = useProjectSearch(debouncedQuery, srn, { group, limit, skip: !isOpen || !srn });

  const handleChange = React.useCallback((e) => {
    updateQuery(e.target.value);
  }, []);

  const handleReset = React.useCallback((e) => {
    updateQuery('');
  }, []);

  return (
    <SearchComponent
      placeholder={placeholder}
      query={query}
      onChange={handleChange}
      nodes={data?.items}
      isOpen={isOpen}
      onClose={onClose}
      onReset={handleReset}
      isLoading={isValidating}
      error={error}
    />
  );
};
