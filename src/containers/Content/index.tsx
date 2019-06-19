import { safeParse } from '@stoplight/json';
import gql from 'graphql-tag';
import * as React from 'react';
import { createClient, Provider, useQuery } from 'urql';
import { HttpOperation } from '../../components/HttpOperation';

const getGraphNodeByUri = gql`
  query graphNodeByUri($uri: String!, $projectId: Int!) {
    graphNodeByUri(uri: $uri, projectId: $projectId) {
      version
      id
      uri
      type
      data
      project {
        id
      }
    }
  }
`;

export interface IContentContainer extends IGraphQLContainer {
  uri: string;
  projectId: number;
}

export interface IGraphQLContainer {
  apiUrl: string;
  apiToken: string;
}

function withGraphQL<T extends IGraphQLContainer>(Component: React.ComponentType<Omit<T, 'apiUrl' | 'apiToken'>>) {
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

export const ContentContainer: React.FunctionComponent<IContentContainer> = withGraphQL(({ uri, projectId }) => {
  const [res] = useQuery({
    query: getGraphNodeByUri,
    variables: { uri, projectId },
  });

  if (res.fetching) {
    return <>Loading...</>;
  }

  if (res.error) {
    console.log(res);
    return <>Error loading resource. Check the developer console for more information.</>;
  }

  if (!res.data || !res.data.graphNodeByUri) {
    return <>Not Found</>;
  }

  return <Content type={res.data.graphNodeByUri.type} value={safeParse(res.data.graphNodeByUri.data)} />;
});

export interface IContent {
  type: string;
  value: any;
}

export const Content: React.FunctionComponent<IContent> = ({ type, value }) => {
  if (type === 'http_operation') {
    return <HttpOperation value={value} />;
  }

  return <>Resource type {{ type }} is not supported.</>;
};
