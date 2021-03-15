import { Box, Flex } from '@stoplight/mosaic';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { useTocContents } from '../../hooks/useTocContents';
import { ITableOfContentsTree } from '../../types';
import { getNodeType, isOperation, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';
import { TryItWithRequestSamples } from '../TryIt';

type SidebarLayoutProps = {
  pathname: string;
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ pathname, tree, uriMap }) => {
  const contents = useTocContents(tree).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
  const nodeData = uriMap[pathname] || uriMap['/'];
  const showTryIt = isOperation(pathname);

  if (nodeType === NodeType.HttpService && !(nodeData as IHttpService).description) {
    const item = contents.find(content => content.type === 'item');

    if (item && item.to) {
      return <Redirect to={item.to} />;
    }
  }

  return (
    <Flex>
      <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      <Box p={5} overflowX="hidden" style={{ flexGrow: 3, flexBasis: 0, overflowWrap: 'anywhere' }}>
        <Docs key={pathname} className="px-10" nodeData={nodeData} nodeType={nodeType} />
      </Box>
      {showTryIt && (
        <Box p={5} overflowX="hidden" style={{ flexGrow: 2, flexBasis: 0, overflowWrap: 'anywhere' }}>
          <TryItWithRequestSamples key={pathname} httpOperation={nodeData as IHttpOperation} />
        </Box>
      )}
    </Flex>
  );
};
