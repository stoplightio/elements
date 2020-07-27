import { safeParse } from '@stoplight/json';
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
  $workspaceSlug: String!
  $projectSlug: String!
  $branchSlug: String
) {
  projectTableOfContents(projectSlug: $projectSlug, workspaceSlug: $workspaceSlug, branchSlug: $branchSlug) {
    data
  }
}
`;

export const TableOfContents: React.FC<ITableOfContents> = ({ className }) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data, fetching }] = useQuery({
    query: tocQuery,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
    },
  });
  const tocData = data?.projectTableOfContents?.data;
  const tree: ITableOfContentsTree = tocData ? tocData : { items: [] };

  if (fetching) {
    return <TableOfContentsSkeleton className={className} />;
  }

  return <TableOfContentsComponent className={className} tree={tree} />;
};
