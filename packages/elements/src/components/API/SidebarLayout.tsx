import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTocContents } from '../../hooks/useTocContents';
import { ILinkComponentProps, ITableOfContentsTree } from '../../types';
import { getNodeType, isOperation } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';
import { TryIt } from '../TryIt';
import { TryItHeader } from '../TryIt/header';

type SidebarLayoutProps = {
  pathname: string;
  tree: ITableOfContentsTree;
  bundledNodeData: unknown;
  linkComponent?: React.ComponentType<ILinkComponentProps>;
  apiDescriptionUrl?: string;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  pathname,
  tree,
  bundledNodeData,
  linkComponent: LinkComponent,
}) => {
  const contents = useTocContents(tree).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
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
          <Docs className="px-10" nodeData={bundledNodeData} nodeType={nodeType} />
          {showTryIt && (
            <div className="w-2/5 border-l relative">
              <div className="absolute inset-0 overflow-auto px-10">
                <TryItHeader />
                <TryIt nodeType={nodeType} nodeData={bundledNodeData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
