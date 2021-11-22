import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

import { withQueryClientProvider } from './withQueryClientProvider';

describe('withQueryClientProvider()', () => {
  it('should re-use react-query context if already present in tree, rather than creating a new provider', () => {
    const queryClientFromParent = new QueryClient();
    let queryClientFromProvider: QueryClient | undefined;

    const Page = withQueryClientProvider(() => {
      queryClientFromProvider = useQueryClient();
      return null;
    });

    render(
      <QueryClientProvider client={queryClientFromParent}>
        <Page />
      </QueryClientProvider>,
    );

    expect(queryClientFromProvider).toBe(queryClientFromParent);
  });

  it('should create new react-query context if not already present in tree', () => {
    let queryClientFromProvider: QueryClient | undefined;

    const Page = withQueryClientProvider(() => {
      queryClientFromProvider = useQueryClient();
      return null;
    });

    render(<Page />);

    expect(queryClientFromProvider).toBeInstanceOf(QueryClient);
  });
});
