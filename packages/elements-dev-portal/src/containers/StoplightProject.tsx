import { SidebarLayout } from '@stoplight/elements/components/Layout/SidebarLayout';
import { findFirstNode } from '@stoplight/elements/components/MosaicTableOfContents/utils';
import { withPersistenceBoundary } from '@stoplight/elements/context/Persistence';
import { withMosaicProvider } from '@stoplight/elements/hoc/withMosaicProvider';
import { useRouter } from '@stoplight/elements/hooks/useRouter';
import { withStyles } from '@stoplight/elements/styled';
import { RoutingProps } from '@stoplight/elements/types';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Link, Redirect, Route, useHistory, useParams } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { NodeContent } from '../components/NodeContent';
import { NotFound } from '../components/NotFound';
import { Provider } from '../components/Provider';
import { TableOfContents } from '../components/TableOfContents';
import { useGetBranches } from '../hooks/useGetBranches';
import { useGetNodeContent } from '../hooks/useGetNodeContent';
import { useGetTableOfContents } from '../hooks/useGetTableOfContents';
import { Branch } from '../interfaces/branch';

export interface StoplightProjectProps extends RoutingProps {
  /**
   * The slug of the Stoplight Project.
   * @example "elements"
   */
  projectId: string;
  /**
   * If your company runs an on-premise deployment of Stoplight,
   * set this prop to point the StoplightProject component at the URL of that instance.
   */
  platformUrl?: string;
}

const StoplightProjectImpl: React.FC<StoplightProjectProps> = ({ projectId }) => {
  const history = useHistory();
  const { branchSlug = '', nodeSlug = '' } = useParams<{ branchSlug?: string; nodeSlug: string }>();

  const { data: tableOfContents, isFetched: isTocFetched } = useGetTableOfContents({ projectId, branchSlug });
  const { data: branches } = useGetBranches({ projectId });
  const { data: node, isFetched } = useGetNodeContent({ nodeSlug, projectId, branchSlug });

  let elem = <Loading />;
  if (!nodeSlug) {
    if (isTocFetched) {
      if (tableOfContents?.items) {
        const firstNode = findFirstNode(tableOfContents.items);
        if (firstNode) {
          return <Redirect to={branchSlug ? `/branches/${branchSlug}/${firstNode.slug}` : `/${firstNode.slug}`} />;
        }
      }
    }
  } else if (!isFetched) {
    elem = <Loading />;
  } else if (!node) {
    elem = <NotFound />;
  } else {
    elem = <NodeContent node={node} Link={Link} />;
  }

  return (
    <SidebarLayout
      sidebar={
        tableOfContents ? (
          <TableOfContents
            activeId={node?.id || ''}
            tableOfContents={tableOfContents}
            Link={Link}
            branchSlug={branchSlug || ''}
            branches={branches || []}
            onChange={(branch: Branch) => {
              history.push(`/branches/${branch.slug}/${nodeSlug}`);
            }}
          />
        ) : null
      }
    >
      {elem}
    </SidebarLayout>
  );
};

const StoplightProjectRouter = ({ projectId, platformUrl, basePath = '/', router }: StoplightProjectProps) => {
  const { Router, routerProps } = useRouter(router ?? 'history', basePath);

  return (
    <Provider platformUrl={platformUrl}>
      <Router {...routerProps}>
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
    </Provider>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = pipe(withStyles, withPersistenceBoundary, withMosaicProvider)(StoplightProjectRouter);
