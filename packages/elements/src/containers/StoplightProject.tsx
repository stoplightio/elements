import { IComponentMapping } from '@stoplight/markdown-viewer';
import { Optional } from '@stoplight/types';
import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { withRouter } from '../hoc/withRouter';
import { useUrqlClient } from '../hooks/useUrqlClient';
import {
  ILinkComponentProps,
  IStoplightProject,
  ITableOfContentsTree,
  Item,
  TableOfContentItem,
  TableOfContentsLinkWithId,
} from '../types';
import { getWorkspaceSlug } from '../utils/sl/getWorkspaceSlug';
import { DocsProvider } from './Docs';
import { TableOfContents } from './TableOfContents';
import { TryItProvider } from './TryIt';

export const StoplightProject = withRouter<IStoplightProject>(
  ({ workspace, project, branch, linkComponent: LinkComponent, authToken }) => {
    const [firstItem, setFirstItem] = React.useState<Item>();
    const { pathname } = useLocation();
    const workspaceSlug = getWorkspaceSlug(workspace);
    const client = useUrqlClient(`${workspace}/graphql`, { authToken });

    const showTryIt = isOperation(pathname);

    const components: Optional<IComponentMapping> = React.useMemo(() => {
      return LinkComponent !== void 0
        ? {
            link: ({ node, children }) => {
              return (
                <LinkComponent url={node.url} data={node.data}>
                  {children}
                </LinkComponent>
              );
            },
          }
        : void 0;
    }, [LinkComponent]);

    if (pathname === '/' && firstItem) {
      return <Redirect to={firstItem.uri} />;
    }

    return (
      <div className="StoplightProject flex flex-row">
        <TableOfContents
          workspaceUrl={workspace}
          projectSlug={project}
          branchSlug={branch}
          rowComponent={Row}
          rowComponentExtraProps={{ pathname, linkComponent: LinkComponent }}
          nodeUri={pathname}
          urqlClient={client}
          onData={(tocTree: ITableOfContentsTree) => {
            if (pathname === '/' && tocTree?.items?.length) {
              const firstItem = tocTree.items.find(isItem);
              setFirstItem(firstItem);
            }
          }}
        />
        <div className="flex-grow">
          <div className="flex">
            <DocsProvider
              host={workspace}
              workspace={workspaceSlug}
              project={project}
              branch={branch}
              node={pathname}
              components={components}
              urqlClient={client}
              className="px-10"
            />
            {showTryIt && (
              <div className="w-2/5 border-l relative">
                <div className="absolute inset-0 overflow-auto px-10">
                  <TryItProvider
                    host={workspace}
                    workspace={workspaceSlug}
                    project={project}
                    branch={branch}
                    node={pathname}
                    components={components}
                    urqlClient={client}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

type ToCExtraProps = {
  pathname: string;
  linkComponent?: React.ComponentType<ILinkComponentProps>;
};

const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  const LinkComponent = props.extra.linkComponent;

  if (!props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isSelected: props.item.to === props.extra.pathname,
    to: props.item.to ?? '',
  };

  if (LinkComponent) {
    return (
      <LinkComponent url={item.to} data={{ item }}>
        <DefaultRow {...props} item={item} />
      </LinkComponent>
    );
  }

  return (
    <Link to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';

const isOperation = (uri: string) => /\/paths\/.+\/(get|post|put|patch|delete|head|options|trace)$/.test(uri);
