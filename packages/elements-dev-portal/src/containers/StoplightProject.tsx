import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  findFirstNode,
  ReactRouterMarkdownLink,
  RouterTypeContext,
  RoutingProps,
  SidebarLayout,
  useResponsiveLayout,
  useRouter,
  withStyles,
} from '@jpmorganchase/elemental-core';
import { Box, Button, Icon, useModalState } from '@stoplight/mosaic';
import * as React from 'react';
import { Link, Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';

import { BranchSelector } from '../components/BranchSelector';
import { DevPortalProvider } from '../components/DevPortalProvider';
import { Forbidden } from '../components/Forbidden';
import { Loading } from '../components/Loading';
import { NodeContent } from '../components/NodeContent';
import { NotFound } from '../components/NotFound';
import { SearchOverlay } from '../components/Search/SearchOverlay';
import { TableOfContents } from '../components/TableOfContents';
import { UpgradeToStarter } from '../components/UpgradeToStarter';
import { ResponseError } from '../handlers/getNodeContent';
import { useGetBranches } from '../hooks/useGetBranches';
import { useGetNodeContent } from '../hooks/useGetNodeContent';
import { useGetNodes } from '../hooks/useGetNodes';
import { useGetTableOfContents } from '../hooks/useGetTableOfContents';
import { NodeSearchResult } from '../types';

export interface StoplightProjectProps extends RoutingProps {
  /**
   * The ID of the Stoplight Project.
   * @example "d2s6NDE1NTU"
   */
  projectId: string;
  /**
   * If your company runs an on-premise deployment of Stoplight,
   * set this prop to point the StoplightProject component at the URL of that instance.
   */
  platformUrl?: string;

  /**
   * Allows to hide TryIt component
   */
  hideTryIt?: boolean;

  /**
   * Allows to hide mocking button
   */
  hideMocking?: boolean;

  /**
   * Allows to hide export button
   * @default false
   */
  hideExport?: boolean;

  /**
   * If set to true, all table of contents panels will be collapsed.
   * @default false
   */
  collapseTableOfContents?: boolean;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * URL of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;
}

const StoplightProjectImpl: React.FC<StoplightProjectProps> = ({
  projectId,
  hideTryIt,
  hideMocking,
  hideExport,
  collapseTableOfContents = false,
  tryItCredentialsPolicy,
  tryItCorsProxy,
}) => {
  const { branchSlug: encodedBranchSlug = '', nodeSlug = '' } = useParams<{ branchSlug?: string; nodeSlug: string }>();
  const branchSlug = decodeURIComponent(encodedBranchSlug);
  const history = useHistory();

  const { data: tableOfContents, isFetched: isTocFetched } = useGetTableOfContents({ projectId, branchSlug });
  const { data: branches } = useGetBranches({ projectId });
  const {
    data: node,
    isLoading: isLoadingNode,
    isError,
    error: nodeError,
  } = useGetNodeContent({
    nodeSlug,
    projectId,
    branchSlug,
  });
  const { isOpen, open, close } = useModalState();
  const [search, setSearch] = React.useState('');
  const onSearchResultClick = (item?: NodeSearchResult) => {
    close();
  };

  const { isResponsiveLayoutEnabled } = useResponsiveLayout();

  const { data, isFetching } = useGetNodes({
    search,
    projectIds: [projectId],
    pause: !isResponsiveLayoutEnabled,
  });

  const container = React.useRef<HTMLDivElement>(null);

  if (!nodeSlug && isTocFetched && tableOfContents?.items) {
    const firstNode = findFirstNode(tableOfContents.items);
    if (firstNode) {
      return <Redirect to={branchSlug ? `/branches/${branchSlug}/${firstNode.slug}` : `/${firstNode.slug}`} />;
    }
  }

  let elem: JSX.Element;
  if (isLoadingNode || !isTocFetched) {
    elem = <Loading />;
  } else if (isError) {
    if (nodeError instanceof ResponseError) {
      if (nodeError.code === 402) {
        elem = <UpgradeToStarter />;
      } else if (nodeError.code === 403) {
        elem = <Forbidden />;
      } else {
        elem = <NotFound />;
      }
    } else {
      elem = <NotFound />;
    }
  } else if (!node) {
    elem = <NotFound />;
  } else if (node?.slug && nodeSlug !== node.slug) {
    // Handle redirect to node's slug
    return <Redirect to={branchSlug ? `/branches/${branchSlug}/${node.slug}` : `/${node.slug}`} />;
  } else {
    elem = (
      <>
        <Button
          data-test="show-project-search-overlay"
          onPress={open}
          appearance="default"
          w="full"
          rounded="lg"
          borderColor="light"
        >
          <Icon icon={faSearch} />
          <Box pl={2}>{node.title}</Box>
        </Button>
        <SearchOverlay
          toc={tableOfContents}
          projectSlug={nodeSlug}
          branchSlug={branchSlug}
          nodeSlug={nodeSlug}
          isFetching={isFetching || !isTocFetched}
          search={search}
          setSearch={setSearch}
          data={data}
          isSearchShowing={isOpen}
          onClose={close}
          onClick={onSearchResultClick}
        />
        <NodeContent
          node={node}
          Link={ReactRouterMarkdownLink}
          hideTryIt={hideTryIt}
          hideMocking={hideMocking}
          hideExport={hideExport}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
        />
      </>
    );
  }

  const handleTocClick = () => {
    if (container.current) {
      container.current.scrollIntoView();
    }
  };

  return (
    <SidebarLayout
      ref={container}
      sidebar={
        <>
          {branches && branches.items.length > 1 ? (
            <BranchSelector
              branchSlug={branchSlug}
              branches={branches.items}
              onChange={branch => {
                const encodedBranchSlug = encodeURIComponent(branch.slug);
                history.push(branch.is_default ? `/${nodeSlug}` : `/branches/${encodedBranchSlug}/${nodeSlug}`);
              }}
            />
          ) : null}
          {tableOfContents ? (
            <TableOfContents
              activeId={node?.id || nodeSlug?.split('-')[0] || ''}
              tableOfContents={tableOfContents}
              Link={Link}
              collapseTableOfContents={collapseTableOfContents}
              onLinkClick={handleTocClick}
            />
          ) : null}
        </>
      }
    >
      {elem}
    </SidebarLayout>
  );
};

const StoplightProjectRouter = ({
  platformUrl,
  basePath = '/',
  staticRouterPath = '',
  router = 'history',
  ...props
}: StoplightProjectProps) => {
  const { Router, routerProps } = useRouter(router, basePath, staticRouterPath);

  return (
    <DevPortalProvider platformUrl={platformUrl}>
      <RouterTypeContext.Provider value={router}>
        <Router {...routerProps} key={basePath}>
          <Switch>
            <Route path="/branches/:branchSlug/:nodeSlug+" exact>
              <StoplightProjectImpl {...props} />
            </Route>

            <Route path="/:nodeSlug+" exact>
              <StoplightProjectImpl {...props} />
            </Route>

            <Route path="/" exact>
              <StoplightProjectImpl {...props} />
            </Route>
          </Switch>
        </Router>
      </RouterTypeContext.Provider>
    </DevPortalProvider>
  );
};

/**
 * The StoplightProject component displays a traditional documentation UI for an existing Stoplight Project.
 */
export const StoplightProject = withStyles(StoplightProjectRouter);
