import { SidebarLayout } from '@stoplight/elements-core/components/Layout/SidebarLayout';
import { PoweredByLink } from '@stoplight/elements-core/components/PoweredByLink';
import { Row } from '@stoplight/elements-core/components/TableOfContents/Row';
import { defaultPlatformUrl } from '@stoplight/elements-core/constants';
import { Docs } from '@stoplight/elements-core/containers/Docs';
import { Provider } from '@stoplight/elements-core/containers/Provider';
import { TableOfContents } from '@stoplight/elements-core/containers/TableOfContents';
import { withPersistenceBoundary } from '@stoplight/elements-core/context/Persistence';
import { withMosaicProvider } from '@stoplight/elements-core/hoc/withMosaicProvider';
import { withQueryClientProvider } from '@stoplight/elements-core/hoc/withQueryClientProvider';
import { withRouter } from '@stoplight/elements-core/hoc/withRouter';
import { withStyles } from '@stoplight/elements-core/styled';
import { ITableOfContentsTree, Item, RoutingProps, TableOfContentItem } from '@stoplight/elements-core/types';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

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

  const sidebar = (
    <>
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
      <PoweredByLink source={`${workspaceSlug}/${projectSlug}`} pathname={pathname} packageType="elements-dev-portal" />
    </>
  );

  return (
    <SidebarLayout sidebar={sidebar}>
      {pathname !== '/' && (
        <Provider
          host={platformUrl ?? defaultPlatformUrl}
          workspace={workspaceSlug}
          project={projectSlug}
          branch={branchSlug}
          node={pathname}
          authToken={authToken}
          showMocking
        >
          <Docs node={pathname} />
        </Provider>
      )}
    </SidebarLayout>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = pipe(
  withRouter,
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(StoplightProjectImpl);

const isItem = (item: TableOfContentItem): item is Item => item.type === 'item';
