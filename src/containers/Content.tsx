import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from 'urql';

import { Content as ContentComponent } from '../components/Content';
import { IGraphQLContainer, withGraphQL } from '../hooks/withGraphQL';

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

export interface IContent extends IGraphQLContainer {
  uri: string;
  projectId: number;
  semver?: string;
}

export const Content: React.FunctionComponent<IContent> = withGraphQL(({ uri, projectId, semver }) => {
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

  return <ContentComponent type={res.data.graphNodeByUri.type} value={res.data.graphNodeByUri.data} />;
});
