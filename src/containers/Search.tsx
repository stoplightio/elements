import { SearchDocsQuery, useSearchDocsQuery } from '@stoplight/graphql';
import { get } from 'lodash';
import * as React from 'react';
import { Search as SearchComponent } from '../components/Search';
import { useSearchQuery } from '../hooks/useSearchQuery';

interface ISearchContainer {
  // query: string;
  srn: string;
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  group?: string;
  // pinned?: boolean;
}

export const Search: React.FunctionComponent<ISearchContainer> = ({
  // query,
  isOpen,
  onClose,
  onReset,
  srn,
  group,
  // pinned,
}) => {
  const [lastData, updateLastData] = React.useState<SearchDocsQuery | undefined>();
  const [query, updateQuery] = React.useState('');

  const { data, error, loading, fetchMore } = useSearchQuery(query, srn, isOpen, group);

  React.useEffect(() => {
    if (!loading) {
      updateLastData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const pageInfo = get(data, 'graphNodeSearch.results.pageInfo'); // TODO: I don't think this is right

  const loadMore = React.useCallback(() => {
    if (!pageInfo || !pageInfo.hasNextPage) return;

    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (prev: SearchDocsQuery, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;

        const listData = {
          ...prev,
          graphNodeSearch: {
            ...prev.graphNodeSearch,
            results: {
              ...prev.graphNodeSearch.results,
              items: [...prev.graphNodeSearch.results.items, ...fetchMoreResult.graphNodeSearch.results.items],
              pageInfo: fetchMoreResult.graphNodeSearch.results.pageInfo,
              totalCount: fetchMoreResult.graphNodeSearch.results.totalCount,
            },
          },
        };

        // for some reason UI is not being refreshed automatically, need to force
        updateLastData(listData);

        return listData;
      },
    });
  }, [fetchMore, pageInfo]);

  return (
    <SearchComponent
      query={query}
      onChange={updateQuery}
      nodes={data}
      isOpen={isOpen}
      onClose={onClose}
      onReset={onReset}
      loadMore={loadMore}
      isLoading={loading}
      error={error}
    />
  );
};
