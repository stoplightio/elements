import { ExportButtonProps, ParsedDocs, ResponsiveSidebarLayout } from '@stoplight/elements-core';
import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { computeAPITree, findFirstNodeSlug, isInternal } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
  logo?: string;
  hideTryIt?: boolean;
  hideSchemas?: boolean;
  hideInternal?: boolean;
  hideExport?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
  tryItCorsProxy?: string;
  compact?: number | boolean;
};

export const APIWithResponsiveSidebarLayout: React.FC<SidebarLayoutProps> = ({
  serviceNode,
  logo,
  hideTryIt,
  compact,
  hideSchemas,
  hideInternal,
  hideExport,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const tree = React.useMemo(
    () => computeAPITree(serviceNode, { hideSchemas, hideInternal }),
    [serviceNode, hideSchemas, hideInternal],
  );
  const location = useLocation();
  const { pathname } = location;

  const isRootPath = !pathname || pathname === '/';
  const node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === pathname);

  const layoutOptions = React.useMemo(
    () => ({ hideTryIt: hideTryIt, compact: compact, hideExport: hideExport || node?.type !== NodeType.HttpService }),
    [hideTryIt, hideExport, node, compact],
  );

  if (!node) {
    // Redirect to the first child if node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (firstSlug) {
      return <Redirect to={firstSlug} />;
    }
  }

  if (hideInternal && node && isInternal(node)) {
    return <Redirect to="/" />;
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
    >
      {node && (
        <ParsedDocs
          key={pathname}
          uri={pathname}
          node={node}
          nodeTitle={node.name}
          layoutOptions={layoutOptions}
          location={location}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
        />
      )}
    </ResponsiveSidebarLayout>
  );
};
