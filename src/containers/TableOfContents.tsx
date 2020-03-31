import * as React from 'react';
import { useQuery } from 'urql';

import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { INodeFilter } from '../types';
import { ActiveInfoContext } from './Provider';

export interface ITableOfContents {
  filter?: INodeFilter;
  className?: string;
}

const query = `
query ElementsTableOfContents(
  $workspaceId: Int!
  $projectSlug: String
  $branchSlug: String
  $baseUri: String
) {
  sl_search_nodes(
    args: { workspaceid: $workspaceId, search: "" }
    where: {
      branchNode: { baseUri: { _ilike: $baseUri }, branch: { slug: { _eq: $branchSlug } } }
      project: { slug: { _eq: $projectSlug } }
    }
  ) {
    id

    node {
      id
      uri
    }

    snapshot {
      id
      name
      type
    }
  }
}
`;

const workspaceQuery = `
query ElementsWorkspaceBySlug($slug: String!) {
  workspaces(limit: 1, where: { slug: { _eq: $slug } }) {
    id
  }
}
`;

export const TableOfContents: React.FC<ITableOfContents> = ({ className, filter }) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data: workspaceData, fetching: workspaceFetching }] = useQuery({
    query: workspaceQuery,
    variables: {
      slug: info.workspace,
    },
  });
  const workspaceId = workspaceData?.workspaces[0]?.id;

  const [{ data, fetching }] = useQuery({
    query,
    pause: !workspaceId,
    variables: {
      workspaceId,
      projectSlug: info.project,
      branchSlug: info.branch,
      baseUri: filter?.nodeUri ? `${filter.nodeUri}%` : undefined,
    },
  });

  if (workspaceFetching || fetching) {
    return <TableOfContentsSkeleton className={className} />;
  }

  return <TableOfContentsComponent className={className} nodes={data?.sl_search_nodes} />;
};
