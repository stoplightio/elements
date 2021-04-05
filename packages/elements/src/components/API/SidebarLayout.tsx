import { Box, Flex } from '@stoplight/mosaic';
import { IHttpService, NodeType } from '@stoplight/types';
import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { useTocContents } from '../../hooks/useTocContents';
import { ITableOfContentsTree } from '../../types';
import { getNodeType, IUriMap, mapUriToOperation } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';

type SidebarLayoutProps = {
  pathname: string;
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ pathname, tree, uriMap }) => {
  const operationMap = React.useMemo(() => mapUriToOperation(uriMap), [uriMap]);
  const contents = useTocContents(tree, operationMap).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
  const nodeData = uriMap[pathname] || uriMap['/'];

  const hasOverview = !!contents.find(item => item.to === '/');

  if (nodeType === NodeType.HttpService && !(nodeData as IHttpService).description) {
    const item = contents.find(content => content.type === 'item');

    if (item && item.to) {
      return <Redirect to={item.to} />;
    }
  }

  return (
    <Flex flexGrow className="sl-elements-api">
      <Flex
        bg="canvas-100"
        borderR
        pt={5}
        style={{
          width: `calc((100% - ${MAX_CONTENT_WIDTH}px) / 2 + ${SIDEBAR_WIDTH}px)`,
          paddingLeft: `calc((100% - ${MAX_CONTENT_WIDTH}px) / 2)`,
          minWidth: `${SIDEBAR_WIDTH}px`,
        }}
      >
        <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      </Flex>

      <Flex flexGrow>
        <Box
          px={24}
          style={{
            width: '100%',
            maxWidth: `${MAX_CONTENT_WIDTH - SIDEBAR_WIDTH}px`,
          }}
        >
          <Docs
            key={pathname}
            uri={hasOverview ? pathname : undefined}
            className="sl-pt-16 sl-pb-24"
            nodeData={nodeData}
            nodeType={nodeType}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
