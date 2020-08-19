import { IComponentMapping } from '@stoplight/markdown-viewer';
import { Optional } from '@stoplight/types';
import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { withRouter } from '../hoc/withRouter';
import { useUrqlClient } from '../hooks/useUrqlClient';
import {
  IRenderLinkProps,
  IStoplightProject,
  ITableOfContentsTree,
  Item,
  TableOfContentItem,
  TableOfContentsLinkWithId,
} from '../types';
import { getWorkspaceSlug } from '../utils/sl/getWorkspaceSlug';
import { DocsProvider } from './Docs';
import { TableOfContents } from './TableOfContents';

export const StoplightProject = withRouter<IStoplightProject>(
  ({ workspace, project, branch, renderLink: RenderLink, authToken }) => {
    const [firstItem, setFirstItem] = React.useState<Item>();
    const { pathname } = useLocation();
    const workspaceSlug = getWorkspaceSlug(workspace);
    const client = useUrqlClient(`${workspace}/graphql`, { authToken });

    const components: Optional<IComponentMapping> = React.useMemo(() => {
      return RenderLink !== void 0
        ? {
            link: ({ node, children }) => {
              return (
                <RenderLink url={node.url} data={node.data}>
                  {children}
                </RenderLink>
              );
            },
          }
        : void 0;
    }, [RenderLink]);

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
          rowComponentExtraProps={{ pathname, renderLink: RenderLink }}
          nodeUri={pathname}
          urqlClient={client}
          onData={(tocTree: ITableOfContentsTree) => {
            if (pathname === '/' && tocTree?.items?.length) {
              const firstItem = tocTree.items.find(isItem);
              setFirstItem(firstItem);
            }
          }}
        />
        <div className="flex-grow p-5">
          <DocsProvider
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
    );
  },
);

type ToCExtraProps = {
  pathname: string;
  renderLink?: React.ComponentType<IRenderLinkProps>;
};

const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  const RenderLink = props.extra.renderLink;

  if (!props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isSelected: props.item.to === props.extra.pathname,
    to: props.item.to ?? '',
  };

  if (RenderLink) {
    return (
      <RenderLink url={item.to} data={{ item }}>
        <DefaultRow {...props} item={item} />
      </RenderLink>
    );
  }

  return (
    <Link to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
