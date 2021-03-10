import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { Row } from '../components/TableOfContents/Row';
import { TryItContainer } from '../components/TryIt';
import { defaultPlatformUrl } from '../constants';
import { withPersistenceBoundary } from '../context/Persistence';
import { withRouter } from '../hoc/withRouter';
import { withStyles } from '../styled';
import { ITableOfContentsTree, Item, RoutingProps, TableOfContentItem } from '../types';
import { isOperation } from '../utils/oas';
import { Docs } from './Docs';
import { Provider } from './Provider';
import { TableOfContents } from './TableOfContents';

export interface StoplightProjectProps extends RoutingProps {
  /**
   * The slug of your Stoplight Workspace.
   * (Usually you can find this as part of your Stoplight URL: https://[workspaceSlug].stoplight.io)
   */
  workspaceSlug: string;
  /**
   * The slug of the Stoplight Project.
   * @example "elements"
   */
  projectSlug: string;
  /**
   * If your company runs an on-premise deployment of Stoplight,
   * set this prop to point the StoplightProject component at the URL of that instance.
   */
  platformUrl?: string;
  /**
   * The name of a specific branch of the project to show. If no branch is provided, the default branch will be shown.
   */
  branchSlug?: string;
  /**
   * *TBD*
   */
  authToken?: string;
}

const StoplightProjectImpl: React.FC<StoplightProjectProps> = ({
  workspaceSlug,
  platformUrl,
  projectSlug,
  branchSlug,
  authToken,
}) => {
  const [firstItem, setFirstItem] = React.useState<Item>();
  const { pathname } = useLocation();

  const showTryIt = isOperation(pathname);

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
          {pathname !== '/' && (
            <Provider
              host={platformUrl ?? defaultPlatformUrl}
              workspace={workspaceSlug}
              project={projectSlug}
              branch={branchSlug}
              node={pathname}
              authToken={authToken}
            >
              <Docs node={pathname} className="px-10" />
              {showTryIt && (
                <div className="w-2/5 relative">
                  <div className="inset-0 overflow-auto px-10">
                    <TryItContainer node={pathname} />
                  </div>
                </div>
              )}
            </Provider>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = pipe(withRouter, withStyles, withPersistenceBoundary)(StoplightProjectImpl);

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
