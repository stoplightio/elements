import { filter, uniqBy } from 'lodash';
import * as React from 'react';
import { Search as SearchComponent } from '../components/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { IProjectNode } from '../types';

export interface ISearchContainer {
  srn: string;
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  group?: string;
}

interface ISearchQueryData {
  items: IProjectNode[];
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  totalCount?: number;
}

export const Search: React.FunctionComponent<ISearchContainer> = ({ isOpen, onClose, onReset, srn, group }) => {
  const [lastData, updateLastData] = React.useState<ISearchQueryData | undefined>();
  const [query, updateQuery] = React.useState<string>('');

  function handleChange(e: any) {
    e.persist();
    updateQuery(e.target.value);
  }

  const { data, error, loading } = useSearchQuery(query, srn, isOpen, group);

  React.useEffect(() => {
    if (!loading) {
      updateLastData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <SearchComponent
      query={query}
      onChange={handleChange}
      nodes={data.items}
      isOpen={isOpen}
      onClose={onClose}
      onReset={onReset}
      isLoading={loading}
      error={error}
    />
  );
};
