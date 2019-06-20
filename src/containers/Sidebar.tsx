import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from 'urql';

import { IGraphQLContainer, withGraphQL } from '../hooks/withGraphQL';

const graphNodeSearch = gql`
  query graphNodeSearch(
    $search: String
    $org: String
    $project: String
    $types: [String!]
    $tags: [String!]
    $isCommon: Boolean
    $starred: Boolean
    $first: Int
    $after: String
  ) {
    graphNodeSearch(
      where: {
        search: $search
        org: $org
        project: $project
        types: $types
        tags: $tags
        isCommon: $isCommon
        starred: $starred
      }
      first: $first
      after: $after
    ) {
      results {
        items {
          id
          type
          latestVersion {
            id
            uri
            version
          }
          latestSnapshot {
            id
            name
          }
          project {
            id
          }
        }
        pageInfo {
          startCursor
          hasPreviousPage
          hasNextPage
          endCursor
        }
        totalCount
      }
      tags {
        id
        name
        slug
        count
      }
    }
  }
`;

export interface ISidebar extends IGraphQLContainer {
  org: string;
  project: string;
}

export const Sidebar: React.FunctionComponent<ISidebar> = withGraphQL(({ org, project }) => {
  const [res] = useQuery({
    query: graphNodeSearch,
    variables: { org, project },
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

  console.log(res);
  return <>Found</>;
});
