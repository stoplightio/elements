import { TableOfContents } from '@stoplight/ui-kit';
import { InlineRefResolverProvider } from 'elements/src/containers/Provider';
import { useBundledData } from 'elements/src/hooks/useBundledData';
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
  apiDescriptionUrl?: string;
  document?: unknown;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  pathname,
  tree,
  uriMap,
  linkComponent: LinkComponent,
  apiDescriptionUrl,
  document,
}) => {
  const contents = useTocContents(tree).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
  const nodeData = uriMap[pathname] || uriMap['/'];
  const showTryIt = isOperation(pathname);
  const bundledNodeData = useBundledData(nodeType, nodeData, { baseUrl: apiDescriptionUrl });

  return (
    <>
      <TableOfContents
        contents={contents}
        rowComponent={Row}
        rowComponentExtraProps={{ pathname, linkComponent: LinkComponent }}
      />
      <div className="flex-grow p-5">
        <div className="flex">
          <InlineRefResolverProvider document={document}>
            <Docs className="px-10" nodeData={bundledNodeData} nodeType={nodeType} />
            {showTryIt && (
              <div className="w-2/5 border-l relative">
                <div className="absolute inset-0 overflow-auto px-10">
                  <TryItHeader />
                  <TryIt nodeType={nodeType} nodeData={bundledNodeData} />
                </div>
              </div>
            )}
          </InlineRefResolverProvider>
        </div>
      </div>
    </>
  );
};
