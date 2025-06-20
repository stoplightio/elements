import {
  ElementsOptionsProvider,
  ExportButtonProps,
  ParsedDocs,
  resolveRelativeLink,
  ResponsiveSidebarLayout,
} from '@jpmorganchase/elemental-core';
import { ExtensionAddonRenderer } from '@jpmorganchase/elemental-core/components/Docs';
import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

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
  hideExport?: boolean;
  hideInlineExamples?: boolean;
  hideServerInfo?: boolean;
  hideSecurityInfo?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
  tryItCorsProxy?: string;
  compact?: number | boolean;
  renderExtensionAddon?: ExtensionAddonRenderer;
  basePath?: string;
  outerRouter?: boolean;
  tryItOutDefaultServer?: string;
  useCustomNav?: boolean;
};

export const APIWithResponsiveSidebarLayout: React.FC<SidebarLayoutProps> = ({
  serviceNode,
  logo,
  hideTryItPanel,
  hideTryIt,
  hideSamples,
  compact,
  hideSchemas,
  hideInternal,
  hideExport,
  hideInlineExamples = false,
  hideServerInfo,
  hideSecurityInfo,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  renderExtensionAddon,
  basePath = '/',
  outerRouter = false,
  tryItOutDefaultServer,
  useCustomNav
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
  }, [currentPath]);

  const layoutOptions = React.useMemo(
    () => ({
      hideTryIt: hideTryIt,
      hideTryItPanel,
      hideSamples,
      hideSecurityInfo: hideSecurityInfo,
      hideServerInfo: hideServerInfo,
      compact: compact,
      hideExport: hideExport || node?.type !== NodeType.HttpService,
      hideInlineExamples
    }),
    [hideTryIt, hideSecurityInfo, hideServerInfo, compact, hideExport, hideTryItPanel, hideSamples, node?.type, hideInlineExamples],
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

  const handleTocClick = () => {
    if (container.current) {
      container.current.scrollIntoView();
    }
  };

  return (
    <ResponsiveSidebarLayout
      onTocClick={handleTocClick}
      tree={tree}
      logo={logo ?? serviceNode.data.logo}
      ref={container}
      name={serviceNode.name}
      renderSideBar={!useCustomNav}
    >
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
    </ResponsiveSidebarLayout>
  );
};
