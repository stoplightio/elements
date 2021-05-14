import { SidebarLayout } from '@stoplight/elements-core/components/Layout/SidebarLayout';
import { findFirstNode } from '@stoplight/elements-core/components/MosaicTableOfContents/utils';
import { withPersistenceBoundary } from '@stoplight/elements-core/context/Persistence';
import { withMosaicProvider } from '@stoplight/elements-core/hoc/withMosaicProvider';
import { withQueryClientProvider } from '@stoplight/elements-core/hoc/withQueryClientProvider';
import { useRouter } from '@stoplight/elements-core/hooks/useRouter';
import { withStyles } from '@stoplight/elements-core/styled';
import { RoutingProps } from '@stoplight/elements-core/types';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Link, Redirect, Route, useHistory, useParams } from 'react-router-dom';

import { BranchSelector } from '../components/BranchSelector';
import { DevPortalProvider } from '../components/DevPortalProvider';
import { Loading } from '../components/Loading';
import { NodeContent } from '../components/NodeContent';
import { NotFound } from '../components/NotFound';
import { TableOfContents } from '../components/TableOfContents';
import { useGetBranches } from '../hooks/useGetBranches';
import { useGetNodeContent } from '../hooks/useGetNodeContent';
import { useGetTableOfContents } from '../hooks/useGetTableOfContents';

export interface StoplightProjectProps extends RoutingProps {
  /**
   * The ID of the Stoplight Project.
   * @example "cHJqOjY"
   */
  projectId: string;
  /**
   * If your company runs an on-premise deployment of Stoplight,
   * set this prop to point the StoplightProject component at the URL of that instance.
   */
  platformUrl?: string;
}

const StoplightProjectImpl: React.FC<StoplightProjectProps> = ({ projectId }) => {
  const { branchSlug = '', nodeSlug = '' } = useParams<{ branchSlug?: string; nodeSlug: string }>();
  const history = useHistory();

  const { data: tableOfContents, isFetched: isTocFetched } = useGetTableOfContents({ projectId, branchSlug });
  const { data: branches } = useGetBranches({ projectId });
  const { data: node, isLoading: isLoadingNode } = useGetNodeContent({ nodeSlug, projectId, branchSlug });

  if (!nodeSlug && isTocFetched && tableOfContents?.items) {
    const firstNode = findFirstNode(tableOfContents.items);
    if (firstNode) {
      return <Redirect to={branchSlug ? `/branches/${branchSlug}/${firstNode.slug}` : `/${firstNode.slug}`} />;
    }
  }

  let elem: JSX.Element;
  if (isLoadingNode || !isTocFetched) {
    elem = <Loading />;
  } else if (!node) {
    elem = <NotFound />;
  } else {
    elem = <NodeContent node={node} Link={Link} />;
  }

  return (
    <SidebarLayout
      sidebar={
        <>
          {branches && branches.length > 1 ? (
            <BranchSelector
              branchSlug={branchSlug}
              branches={branches}
              onChange={branch =>
                history.push(branch.is_default ? `/${nodeSlug}` : `/branches/${branch.slug}/${nodeSlug}`)
              }
            />
          ) : null}
          {tableOfContents ? (
            <TableOfContents activeId={node?.id || ''} tableOfContents={tableOfContents} Link={Link} />
          ) : null}
        </>
      }
    >
      {elem}
    </SidebarLayout>
  );
};

const StoplightProjectRouter = ({ projectId, platformUrl, basePath = '/', router }: StoplightProjectProps) => {
  const { Router, routerProps } = useRouter(router ?? 'history', basePath);

  return (
    <DevPortalProvider platformUrl={platformUrl}>
      <Router {...routerProps} key={basePath}>
        <Route path="/branches/:branchSlug/:nodeSlug" exact>
          <StoplightProjectImpl projectId={projectId} />
        </Route>

        <Route path="/:nodeSlug" exact>
          <StoplightProjectImpl projectId={projectId} />
        </Route>

        <Route path="/" exact>
          <StoplightProjectImpl projectId={projectId} />
        </Route>
      </Router>
    </DevPortalProvider>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = pipe(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(StoplightProjectRouter);
