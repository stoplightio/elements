import { RowComponentType, TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';
import { Client, Provider, useQuery } from 'urql';

import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { useTocContents } from '../hooks/useTocContents';
import { ITableOfContentsTree, TableOfContentsLinkWithId } from '../types';
import { getUrqlClient } from '../utils/urql';

export interface ITableOfContents {
  workspaceUrl: string;
  projectSlug: string;
  branchSlug?: string;
  nodeUri?: string;
  onData?: (tocTree: ITableOfContentsTree) => void;
  rowComponent?: RowComponentType<TableOfContentsLinkWithId>;
  className?: string;
}

interface ITableOfContentsWithUqrl extends ITableOfContents {
  urqlClient?: Client;
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

const TableOfContentsContainer: React.FC<ITableOfContents> = ({
  workspaceUrl,
  projectSlug,
  branchSlug,
  nodeUri,
  onData,
  rowComponent,
  className,
}) => {
  const regExp = /^(https?:\/\/)?([^.]+)\./g;
  const match = regExp.exec(workspaceUrl);
  const workspaceSlug = match?.length === 3 ? match[2] : '';

  const [{ data, fetching }] = useQuery({
    query: tocQuery,
    variables: {
      workspaceSlug,
      projectSlug,
      branchSlug,
    },
  });
  const tocData = data?.projectTableOfContents?.data;

  React.useEffect(() => {
    if (tocData) {
      onData?.(tocData);
    }
  }, [onData, tocData]);

  const tree: ITableOfContentsTree = tocData ?? { items: [] };

  const contents = useTocContents(tree).map(item => {
    return {
      ...item,
      isActive: item.type === 'item' && nodeUri !== void 0 ? item.to === nodeUri : false,
    };
  });

  if (fetching) {
    return <TableOfContentsSkeleton className={className} />;
  }

  return <UIKitTableOfContents className={className} contents={contents} rowComponent={rowComponent} />;
};

export const TableOfContents: React.FC<ITableOfContentsWithUqrl> = ({ workspaceUrl, urqlClient, ...rest }) => {
  const client = React.useMemo(() => {
    return getUrqlClient(`${workspaceUrl}/graphql`, urqlClient);
  }, [workspaceUrl, urqlClient]);

  return (
    <Provider value={client}>
      <TableOfContentsContainer workspaceUrl={workspaceUrl} {...rest} />
    </Provider>
  );
};
