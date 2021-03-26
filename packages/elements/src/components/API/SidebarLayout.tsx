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
    <>
      <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      <div className="flex-grow p-5 ContentViewer">
        <div className="flex">
          <Docs
            key={pathname}
            uri={hasOverview ? pathname : undefined}
            className="px-10"
            nodeData={nodeData}
            nodeType={nodeType}
          />
        </div>
      </div>
    </>
  );
};
