import { safeParse } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import gql from 'graphql-tag';
import * as React from 'react';
import { createClient, Provider, useQuery } from 'urql';
import { HttpOperation } from '../../components/HttpOperation';
import { HttpService } from '../../components/HttpService';

const getGraphNodeByUri = gql`
  query graphNodeByUri($uri: String!, $projectId: Int!, $semver: String) {
    graphNodeByUri(uri: $uri, projectId: $projectId, semver: $semver) {
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
  semver?: string;
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

export const ContentContainer: React.FunctionComponent<IContentContainer> = withGraphQL(
  ({ uri, projectId, semver }) => {
    const [res] = useQuery({
      query: getGraphNodeByUri,
      variables: { uri, projectId, semver },
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

    return <Content type={res.data.graphNodeByUri.type} value={res.data.graphNodeByUri.data} />;
  }
);

export interface IContent {
  type: string;
  value: any;
}

export const Content: React.FunctionComponent<IContent> = ({ type, value }) => {
  if (type === 'http_operation') {
    return <HttpOperation value={safeParse(value)} />;
  }

  if (type === 'http_service') {
    return <HttpService value={safeParse(value)} />;
  }

  if (type === 'article') {
    return <MarkdownViewer markdown={value} />;
  }

  if (type === 'model') {
    return <JsonSchemaViewer schema={safeParse(value)} />;
  }

  return <>Resource type {{ type }} is not supported.</>;
};
