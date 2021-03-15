import { Flex } from '@stoplight/mosaic';
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

  const hasOverview = !!contents.find(item => item.to === '/');

  if (nodeType === NodeType.HttpService && !(nodeData as IHttpService).description) {
    const item = contents.find(content => content.type === 'item');

    if (item && item.to) {
      return <Redirect to={item.to} />;
    }
  }

  return (
    <Flex>
      <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      <div className="docs-column">
        <Docs
          key={pathname}
          uri={hasOverview ? pathname : undefined}
          className="px-10"
          nodeData={nodeData}
          nodeType={nodeType}
        />
      </div>
      {showTryIt && (
        <div className="tryit-column">
          <TryItWithRequestSamples key={pathname} httpOperation={nodeData as IHttpOperation} />
        </div>
      )}
    </Flex>
  );
};
