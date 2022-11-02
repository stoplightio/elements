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

import { ServiceChildNode, ServiceNode } from '../../utils/oas/types';
import { computeAPITree, findFirstNodeSlug, isInternal } from './utils';
import { TableOfContents } from "../MosaicTableOfContents";
import { SearchBox } from "../SearchBox";
import {indexDocument} from "../../utils/flex-search";

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

const indexServiceNode = (sNode: ServiceNode) => {
  let name = sNode.name;
  // index all children node
  sNode.children.forEach((node: ServiceChildNode) => indexDocument(name, node));
  sNode.customData?.customServiceNodes?.forEach((node: ServiceChildNode) => {
    indexDocument(name, node)
  });
}

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
  React.useEffect(() => {
    indexServiceNode(serviceNode);
  }, [serviceNode])
  var tree = React.useMemo(() => {
    const tree = computeAPITree(serviceNode, { hideSchemas, hideInternal });

    var newToc: any[] = [];
    newToc.push(...serviceNode.customData.tocTopLevel);
    newToc.push(...serviceNode.customData.tocPredefinedGroup);

    serviceNode.customData.tocGroupMapping.forEach((group: any) => {
      var parent = newToc.find(item => item.title === group.parent);
      if (!parent) {
        return;
      }
      var childs = tree.filter(item => group.childs.indexOf(item.title) != -1);
      parent.items.push(...childs);
    });

    newToc.push(...serviceNode.customData.tocLastLevel);

    // Put Schema to the end
    if (!hideSchemas) {
      const schemaNode = serviceNode.customData.tocSchemaNode || {
        title: 'Schemas',
        items: [],
      };
      newToc.push(schemaNode);
      schemaNode.items.push(...tree.filter((item: any) => item.slug?.startsWith('/schemas/')));
    }

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
      <Flex id="flex-search" mr={4} mb={1} alignItems="center">
        <SearchBox apiDocName={serviceNode.name} />
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
