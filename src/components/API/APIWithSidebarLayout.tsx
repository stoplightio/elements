import {
  ExportButtonProps,
  Logo,
  ParsedDocs,
  PoweredByLink,
  SidebarLayout,
} from '@stoplight/elements-core';
import { Flex, Heading } from '@stoplight/mosaic';
import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { computeAPITree, findFirstNodeSlug, isInternal } from './utils';
import {TableOfContents} from "../MosaicTableOfContents";

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
};

export const APIWithSidebarLayout: React.FC<SidebarLayoutProps> = ({
  serviceNode,
  logo,
  hideTryIt,
  hideSchemas,
  hideInternal,
  hideExport,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  var tree = React.useMemo(() => {
    const tree = computeAPITree(serviceNode, { hideSchemas, hideInternal });

    // console.log('TableOfContents oldTree=', tree);

    var newToc: any[] = [];
    newToc.push(...serviceNode.customData.tocTopLevel);
    newToc.push(...serviceNode.customData.tocPredefinedGroup);

    serviceNode.customData.tocGroupMapping.forEach((group: any) => {
      // console.log('group ->', group);
      // 1. Select the group
      var parent = newToc.find(item => item.title === group.parent);
      if (!parent) {
        return;
      }
      // console.log('parent ->', parent);

      // 2. search all to find matched child group then pop-push to the parent
      var childs = tree.filter(item => group.childs.indexOf(item.title) != -1);
      // console.log('childs ->', group.childs, childs);
      parent.items.push(...childs);
    });

    newToc.push(...serviceNode.customData.tocLastLevel);

    // Put Schema to the end
    const schemaNode = serviceNode.customData.tocSchemaNode || {
      title: 'Schemas',
      items: [],
    };
    newToc.push(schemaNode);
    // @ts-ignore
    schemaNode.items.push(...tree.filter((item: any) => item.slug?.startsWith('/schemas/')));

    // console.log('TableOfContents newToc=', newToc);
    return newToc;
  }, [serviceNode, hideSchemas, hideInternal]);

  // TODOL force to use new tree
  const location = useLocation();
  const { pathname } = location;
  const isRootPath = !pathname || pathname === '/';
  const node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === pathname);

  const layoutOptions = React.useMemo(
    () => ({ hideTryIt: hideTryIt, hideExport: hideExport || node?.type !== NodeType.HttpService }),
    [hideTryIt, hideExport, node],
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

  const sidebar = (
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
        <TableOfContents tree={tree} activeId={pathname} Link={Link} onLinkClick={handleTocClick} />
      </Flex>
      <PoweredByLink source={serviceNode.name} pathname={pathname} packageType="elements" />
    </>
  );

  return (
    <SidebarLayout ref={container} sidebar={sidebar}>
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
    </SidebarLayout>
  );
};
