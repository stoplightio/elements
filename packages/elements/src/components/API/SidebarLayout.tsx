import { IHttpOperation } from '@stoplight/types';
import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTocContents } from '../../hooks/useTocContents';
import { ITableOfContentsTree } from '../../types';
import { getNodeType, isOperation, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';
import { BasicSend } from '../TryIt/BasicSend';

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

  return (
    <>
      <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      <div className="flex-grow p-5 ContentViewer">
        <div className="flex">
          <Docs className="px-10" nodeData={nodeData} nodeType={nodeType} />
          {showTryIt && (
            <div className="w-2/5 relative">
              <div className="inset-0 overflow-auto px-10">
                <BasicSend httpOperation={nodeData as IHttpOperation} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
