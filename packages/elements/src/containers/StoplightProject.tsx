import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { Row } from '../components/TableOfContents/Row';
import { defaultPlatformUrl } from '../constants';
import { withPersistenceBoundary } from '../context/Persistence';
import { withRouter } from '../hoc/withRouter';
import { withStyles } from '../styled';
import { ITableOfContentsTree, Item, RoutingProps, TableOfContentItem } from '../types';
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

  if (pathname === '/' && firstItem) {
    return <Redirect to={firstItem.uri} />;
  }

  return (
    <MosaicProvider>
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
                isStoplightProjectComponent
              >
                <Docs node={pathname} className="px-10" />
              </Provider>
            )}
          </div>
        </div>
      </div>
    </MosaicProvider>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = pipe(withRouter, withStyles, withPersistenceBoundary)(StoplightProjectImpl);

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
