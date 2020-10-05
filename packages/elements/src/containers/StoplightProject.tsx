import { IComponentMapping } from '@stoplight/markdown-viewer';
import { Optional } from '@stoplight/types';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { Row } from '../components/TableOfContents/Row';
import { defaultPlatformUrl } from '../constants';
import { withRouter } from '../hoc/withRouter';
import { useUrqlClient } from '../hooks/useUrqlClient';
import { withStyles } from '../styled';
import { ITableOfContentsTree, Item, LinkComponentType, RoutingProps, TableOfContentItem } from '../types';
import { isOperation } from '../utils/oas';
import { DocsProvider } from './Docs';
import { TableOfContents } from './TableOfContents';
import { TryItProvider } from './TryIt';

export interface StoplightProjectProps extends RoutingProps {
  workspaceSlug: string;
  project: string;
  platformUrl?: string;
  branch?: string;
  authToken?: string;
  linkComponent?: LinkComponentType;
}

const StoplightProjectImpl = withRouter<StoplightProjectProps>(
  ({ workspaceSlug, platformUrl, project, branch, linkComponent: LinkComponent, authToken }) => {
    const [firstItem, setFirstItem] = React.useState<Item>();
    const { pathname } = useLocation();
    const client = useUrqlClient(`${platformUrl ?? defaultPlatformUrl}/graphql`, { authToken });

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
          workspaceSlug={workspaceSlug}
          platformUrl={platformUrl}
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
              host={platformUrl ?? defaultPlatformUrl}
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
                    host={platformUrl ?? defaultPlatformUrl}
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

export const StoplightProject = withStyles(StoplightProjectImpl);

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
