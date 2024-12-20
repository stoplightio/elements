import {
  type CustomLinkComponent,
  ElementsOptionsProvider,
  ExportButtonProps,
  Logo,
  ParsedDocs,
  PoweredByLink,
  resolveRelativeLink,
  SidebarLayout,
  TableOfContents,
  TableOfContentsItem,
} from '@jpmorganchase/elemental-core';
import { ExtensionAddonRenderer } from '@jpmorganchase/elemental-core/components/Docs';
import { Flex, Heading } from '@stoplight/mosaic';
import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { computeAPITree, findFirstNodeSlug, isInternal, resolveRelativePath } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
  logo?: string;
  hideTryItPanel?: boolean;
  hideTryIt?: boolean;
  hideSamples?: boolean;
  hideSchemas?: boolean;
  hideInternal?: boolean;
  hideServerInfo?: boolean;
  hideSecurityInfo?: boolean;
  hideExport?: boolean;
  hideInlineExamples?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
  tryItCorsProxy?: string;
  renderExtensionAddon?: ExtensionAddonRenderer;
  basePath?: string;
  outerRouter?: boolean;
  tryItOutDefaultServer?: string;
  useCustomNav?: boolean;
  layout?: 'sidebar' | 'drawer';
};

export const APIWithSidebarLayout: React.FC<SidebarLayoutProps> = ({
  serviceNode,
  logo,
  hideTryItPanel,
  hideTryIt,
  hideSamples,
  hideSchemas,
  hideSecurityInfo,
  hideServerInfo,
  hideInternal,
  hideExport,
  hideInlineExamples = false,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  renderExtensionAddon,
  basePath = '/',
  outerRouter = false,
  tryItOutDefaultServer,
  useCustomNav,
  layout,
}) => {
  const container = React.useRef<HTMLDivElement>(null);

  const tree = React.useMemo(() => {
    if (!useCustomNav) return computeAPITree(serviceNode, { hideSchemas, hideInternal });
    else return [];
  }, [serviceNode, hideSchemas, hideInternal, useCustomNav]);

  const location = useLocation();
  const { pathname: currentPath } = location;
  const relativePath = resolveRelativePath(currentPath, basePath, outerRouter);
  const isRootPath = relativePath === '/';
  const node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === relativePath);

  React.useEffect(() => {
    // This is here to trick elements into reloading everytime the url changes so that we can use own sideabar
  }, [pathname]);

  const layoutOptions = React.useMemo(
    () => ({
      hideTryIt: hideTryIt,
      hideTryItPanel,
      hideSamples,
      hideServerInfo: hideServerInfo,
      hideSecurityInfo: hideSecurityInfo,
      hideExport: hideExport || node?.type !== NodeType.HttpService,
      hideInlineExamples
    }),
    [hideTryIt, hideServerInfo, hideSecurityInfo, hideExport, hideTryItPanel, hideSamples, node?.type, hideInlineExamples],
  );

  if (!node) {
    // Redirect to the first child if node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (firstSlug) {
      return <Navigate to={resolveRelativeLink(firstSlug)} replace />;
    }
  }

  if (hideInternal && node && isInternal(node)) {
    return <Navigate to="." replace />;
  }

  const sidebar = (
    <Sidebar serviceNode={serviceNode} logo={logo} container={container} pathname={relativePath} tree={tree} />
  );

  return (
    <SidebarLayout ref={container} sidebar={sidebar} renderSideBar={!useCustomNav} layout={layout}>
      {node && (
        <ElementsOptionsProvider renderExtensionAddon={renderExtensionAddon}>
          <ParsedDocs
            key={relativePath}
            uri={relativePath}
            node={node}
            nodeTitle={node.name}
            layoutOptions={layoutOptions}
            location={location}
            exportProps={exportProps}
            tryItCredentialsPolicy={tryItCredentialsPolicy}
            tryItCorsProxy={tryItCorsProxy}
            renderExtensionAddon={renderExtensionAddon}
            tryItOutDefaultServer={tryItOutDefaultServer}
          />
        </ElementsOptionsProvider>
      )}
    </SidebarLayout>
  );
};

type SidebarProps = {
  serviceNode: ServiceNode;
  logo?: string;
  container: React.RefObject<HTMLElement>;
  pathname: string;
  tree: TableOfContentsItem[];
};

export const Sidebar: React.FC<SidebarProps> = ({ serviceNode, logo, container, pathname, tree }) => {
  const handleTocClick = () => {
    if (container.current) {
      container.current.scrollIntoView();
    }
  };

  return (
    <>
      <Flex ml={4} mb={5} alignItems="center">
        {logo ? (
          <Logo logo={{ url: logo, altText: 'logo' }} />
        ) : (
          serviceNode.data.logo && <Logo logo={serviceNode.data.logo} />
        )}
        <Heading size={4}>{serviceNode.name}</Heading>
      </Flex>
      <Flex flexGrow flexShrink overflowY="auto" direction="col">
        <TableOfContents
          tree={tree}
          activeId={pathname}
          Link={Link as CustomLinkComponent}
          onLinkClick={handleTocClick}
        />
      </Flex>
      <PoweredByLink source={serviceNode.name} pathname={pathname} packageType="elements" />
    </>
  );
};
Sidebar.displayName = 'Sidebar';
