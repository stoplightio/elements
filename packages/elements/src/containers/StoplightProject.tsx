import { IComponentMapping } from '@stoplight/markdown-viewer';
import { dirname, resolve } from '@stoplight/path';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Row } from '../components/TableOfContents/Row';
import { defaultPlatformUrl } from '../constants';
import { withRouter } from '../hoc/withRouter';
import { withStyles } from '../styled';
import { ITableOfContentsTree, Item, RoutingProps, TableOfContentItem } from '../types';
import { isOperation } from '../utils/oas';
import { Docs } from './Docs';
import { Provider } from './Provider';
import { TableOfContents } from './TableOfContents';
import { TryIt } from './TryIt';

export interface StoplightProjectProps extends RoutingProps {
  workspaceSlug: string;
  projectSlug: string;
  platformUrl?: string;
  branchSlug?: string;
  authToken?: string;
}

const StoplightProjectImpl = withRouter<StoplightProjectProps>(
  ({ workspaceSlug, platformUrl, projectSlug, branchSlug, authToken }) => {
    const [firstItem, setFirstItem] = React.useState<Item>();
    const { pathname } = useLocation();

    const showTryIt = isOperation(pathname);

    const link: IComponentMapping['link'] = React.useMemo(
      () => ({ node, children }) => {
        if (/^(http|#|mailto)/.test(node.url)) {
          return (
            <a href={node.url} target={node.url.startsWith('#') ? undefined : '_blank'} rel="noreferrer noopener">
              {children}
            </a>
          );
        }

        const nodeDestinationUri = node.url;
        // resolve will produce an absolute uri that starts with `/`, prefix with a `.` so that reach router
        // navigates relative to base location in app
        const resolvedUri = `.${resolve(dirname(pathname), nodeDestinationUri)}`;

        return <Link to={resolvedUri}>{children}</Link>;
      },
      [pathname],
    );

    if (pathname === '/' && firstItem) {
      return <Redirect to={firstItem.uri} />;
    }

    return (
      <div className="StoplightProject flex flex-row">
        <TableOfContents
          workspaceSlug={workspaceSlug}
          platformUrl={platformUrl}
          projectSlug={projectSlug}
          branchSlug={branchSlug}
          rowComponent={Row}
          rowComponentExtraProps={{ pathname }}
          nodeUri={pathname}
          onData={(tocTree: ITableOfContentsTree) => {
            if (pathname === '/' && tocTree?.items?.length) {
              const firstItem = tocTree.items.find(isItem);
              setFirstItem(firstItem);
            }
          }}
          authToken={authToken}
        />
        <div className="flex-grow p-5 ContentViewer">
          <div className="flex">
            <Provider
              host={platformUrl ?? defaultPlatformUrl}
              workspace={workspaceSlug}
              project={projectSlug}
              branch={branchSlug}
              node={pathname}
              authToken={authToken}
              components={{ link }}
            >
              <Docs node={pathname} className="px-10" />
              {showTryIt && (
                <div className="w-2/5 border-l relative">
                  <div className="inset-0 overflow-auto px-10">
                    <TryIt node={pathname} />
                  </div>
                </div>
              )}
            </Provider>
          </div>
        </div>
      </div>
    );
  },
);

export const StoplightProject = withStyles(StoplightProjectImpl);

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
