import { SidebarLayout } from '@stoplight/elements/components/Layout/SidebarLayout';
import { findFirstNode } from '@stoplight/elements/components/MosaicTableOfContents/utils';
import { withPersistenceBoundary } from '@stoplight/elements/context/Persistence';
import { withMosaicProvider } from '@stoplight/elements/hoc/withMosaicProvider';
import { withRouter } from '@stoplight/elements/hoc/withRouter';
import { withStyles } from '@stoplight/elements/styled';
import { RoutingProps } from '@stoplight/elements/types';
import { pipe } from 'lodash/fp';
import * as React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { NodeContent } from '../components/NodeContent';
import { NotFound } from '../components/NotFound';
import { Provider } from '../components/Provider';
import { TableOfContents } from '../components/TableOfContents';
import { useGetNodeContent } from '../hooks/useGetNodeContent';
import { useGetTableOfContents } from '../hooks/useGetTableOfContents';

export interface StoplightProjectProps extends RoutingProps {
  /**
   * The slug of the Stoplight Project.
   * @example "elements"
   */
  projectId: string;
  /**
   * The name of a specific branch of the project to show. If no branch is provided, the default branch will be shown.
   */
  branchSlug?: string;
  /**
   * If your company runs an on-premise deployment of Stoplight,
   * set this prop to point the StoplightProject component at the URL of that instance.
   */
  platformUrl?: string;
}

const StoplightProjectImpl: React.FC<StoplightProjectProps> = ({ platformUrl, projectId, branchSlug }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const nodeSlug = pathname === '/' ? '' : pathname;

  const { data: tableOfContents } = useGetTableOfContents({ projectId, branchSlug });
  const { data: node, isFetched } = useGetNodeContent({ nodeSlug, projectId, branchSlug });

  React.useEffect(() => {
    // Automatically redirect to the first node in the table of contents
    if (!nodeSlug && tableOfContents?.items) {
      const firstNode = findFirstNode(tableOfContents.items);
      if (firstNode) {
        history.replace(firstNode.slug);
      }
    }
  }, [nodeSlug, tableOfContents, history]);

  let elem;
  if (!isFetched || !nodeSlug) {
    elem = <Loading />;
  } else if (!node) {
    elem = <NotFound />;
  } else {
    elem = <NodeContent node={node} Link={Link} />;
  }

  return (
    <SidebarLayout
      sidebar={tableOfContents ? <TableOfContents activeId="" tableOfContents={tableOfContents} Link={Link} /> : null}
    >
      {elem}
    </SidebarLayout>
  );
};

const WrappedStoplightProject = (props: StoplightProjectProps) => {
  return (
    <Provider platformUrl={props.platformUrl}>
      <StoplightProjectImpl {...props} />
    </Provider>
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
)(WrappedStoplightProject);
