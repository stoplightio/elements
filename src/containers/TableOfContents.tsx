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

// TODO (CL): add the sl_search_nodes query
const query = ``;

export const TableOfContents: React.FC<ITableOfContents> = ({ className, filter }) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data, fetching }] = useQuery({
    query,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      baseUri: filter?.nodeUri ? `${filter.nodeUri}%` : undefined,
    },
  });

  if (fetching) {
    return <TableOfContentsSkeleton className={className} />;
  }

  return <TableOfContentsComponent className={className} nodes={data.sl_search_nodes} />;
};
