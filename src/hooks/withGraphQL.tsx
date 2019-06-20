import * as React from 'react';
import { createClient, Provider } from 'urql';

export interface IGraphQLContainer {
  apiUrl: string;
  apiToken: string;
}

export function withGraphQL<T extends IGraphQLContainer>(
  Component: React.ComponentType<Omit<T, 'apiUrl' | 'apiToken'>>
) {
  return ({ apiUrl, apiToken, ...props }: T) => {
    const client = React.useMemo(
      () =>
        createClient({
          url: apiUrl || 'http://localhost:4060/graphql',
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          },
        }),
      [apiUrl]
    );

    return (
      <Provider value={client}>
        <Component {...props} />
      </Provider>
    );
  };
}
