import { Dictionary } from '@stoplight/types';
import { RowComponentType, TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';
import { Client, Provider, useQuery } from 'urql';

import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { useTocContents } from '../hooks/useTocContents';
import { ITableOfContentsTree, TableOfContentsLinkWithId } from '../types';
import { getWorkspaceSlug } from '../utils/sl/getWorkspaceSlug';
import { getUrqlClient } from '../utils/urql';

export interface ITableOfContents {
  workspaceUrl: string;
  projectSlug: string;
  branchSlug?: string;
  nodeUri?: string;
  onData?: (tocTree: ITableOfContentsTree) => void;
  rowComponent?: RowComponentType<TableOfContentsLinkWithId>;
  rowComponentExtraProps?: Dictionary<unknown>;
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
  rowComponentExtraProps,
  className,
}) => {
  const workspaceSlug = getWorkspaceSlug(workspaceUrl);

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

  return (
    <UIKitTableOfContents
      className={className}
      contents={contents}
      rowComponent={rowComponent}
      rowComponentExtraProps={rowComponentExtraProps}
    />
  );
};

export const TableOfContents: React.FC<ITableOfContentsWithUqrl> = ({ workspaceUrl, urqlClient, ...rest }) => {
  const client = React.useMemo(() => {
    return getUrqlClient(`${workspaceUrl}/graphql`, { urqlClient });
  }, [workspaceUrl, urqlClient]);

  return (
    <Provider value={client}>
      <TableOfContentsContainer workspaceUrl={workspaceUrl} {...rest} />
    </Provider>
  );
};
