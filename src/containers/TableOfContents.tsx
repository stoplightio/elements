import * as React from 'react';
import { useQuery } from 'urql';

import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { ITableOfContentsTree } from '../types';
import { ActiveInfoContext } from './Provider';

export interface ITableOfContents {
  className?: string;
}

const tocQuery = `
query ProjectTableOfContents(
  $workspaceId: Int!
  $projectId: Int!
  $branchSlug: String
) {
  projectTableOfContents(projectId: $projectId, workspaceId: $workspaceId) {
    data
  }
}
`;

const projectQuery = `
query ElementsProjectBySlug($workspaceSlug: String!, $projectSlug: String!) {
  workspaces(limit: 1, where: { slug: { _eq: $workspaceSlug } }) {
    id
  }
  projects(limit: 1, where: { slug: { _eq: $projectSlug } }) {
    id
  }
}
`;

export const TableOfContents: React.FC<ITableOfContents> = ({ className }) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data: projectData, fetching: projectFetching }] = useQuery({
    query: projectQuery,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
    },
  });

  const workspaceId = projectData?.workspaces?.[0]?.id;
  const projectId = projectData?.projects?.[0]?.id;

  const [{ data, fetching }] = useQuery({
    query: tocQuery,
    variables: {
      workspaceId,
      projectId,
    },
  });
  const tocData = data?.projectTableOfContents?.data;
  const tree: ITableOfContentsTree = tocData
    ? typeof tocData === 'string'
      ? JSON.parse(tocData)
      : tocData
    : { items: [] };

  if (projectFetching || fetching) {
    return <TableOfContentsSkeleton className={className} />;
  }

  return <TableOfContentsComponent className={className} tree={tree} />;
};
