// TODO: Fix below
import { SearchDocsQuery } from '@stoplight/graphql';
import * as React from 'react';
import { Search as SearchComponent } from '../components/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';

export interface ISearchContainer {
  srn: string;
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  group?: string;
}

export const Search: React.FunctionComponent<ISearchContainer> = ({ isOpen, onClose, onReset, srn, group }) => {
  const [lastData, updateLastData] = React.useState<SearchDocsQuery | undefined>();
  const [query, updateQuery] = React.useState('');

  const { data, error, loading, fetchMore } = useSearchQuery(query, srn, isOpen, group);

  React.useEffect(() => {
    if (!loading) {
      updateLastData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <SearchComponent
      query={query}
      onChange={updateQuery}
      nodes={data}
      isOpen={isOpen}
      onClose={onClose}
      onReset={onReset}
      isLoading={loading}
      error={error}
    />
  );
};
