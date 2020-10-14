import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTocContents } from '../../hooks/useTocContents';
import { ILinkComponentProps, ITableOfContentsTree } from '../../types';
import { getNodeType, isOperation, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';
import { TryIt } from '../TryIt';
import { TryItHeader } from '../TryIt/header';

type SidebarLayoutProps = {
  pathname: string;
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
  linkComponent?: React.ComponentType<ILinkComponentProps>;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  pathname,
  tree,
  uriMap,
  linkComponent: LinkComponent,
}) => {
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
      <TableOfContents
        contents={contents}
        rowComponent={Row}
        rowComponentExtraProps={{ pathname, linkComponent: LinkComponent }}
      />
      <div className="flex-grow p-5">
        <div className="flex">
          <Docs className="px-10" nodeData={nodeData} nodeType={nodeType} />
          {showTryIt && (
            <div className="w-2/5 border-l relative">
              <div className="absolute inset-0 overflow-visible px-10">
                <TryItHeader />
                <TryIt nodeType={nodeType} nodeData={nodeData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
