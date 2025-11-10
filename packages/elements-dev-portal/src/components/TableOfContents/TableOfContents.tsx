import {
  CustomLinkComponent,
  PoweredByLink,
  TableOfContents as ElementsTableOfContents,
} from '@stoplight/elements-core';
import { BoxProps, Flex } from '@stoplight/mosaic';
import * as React from 'react';

import { ProjectTableOfContents } from '../../types';

export type TableOfContentsProps = BoxProps<'div'> & {
  activeId: string;
  tableOfContents: ProjectTableOfContents;
  Link: CustomLinkComponent;
  collapseTableOfContents?: boolean;
  externalScrollbar?: boolean;
  isInResponsiveMode?: boolean;
  onLinkClick?(): void;
};
export type GroupContextType = {
  lastActiveGroupIndex: number | null;
  lastActiveGroupId: number | null;
  setLastActiveGroupIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setLastActiveGroupId: React.Dispatch<React.SetStateAction<number | null>>;
};
export const GroupContext = React.createContext<GroupContextType | undefined>(undefined);

// Provider component
const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastActiveGroupIndex, setLastActiveGroupIndex] = React.useState<number | null>(null); // default value 0
  const [lastActiveGroupId, setLastActiveGroupId] = React.useState<number | null>(null);

  return (
    <GroupContext.Provider
      value={{
        lastActiveGroupIndex,
        lastActiveGroupId,

        setLastActiveGroupIndex,
        setLastActiveGroupId,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const TableOfContents = ({
  tableOfContents,
  activeId,
  Link,
  collapseTableOfContents = false,
  externalScrollbar,
  isInResponsiveMode = false,
  onLinkClick,
  ...boxProps
}: TableOfContentsProps) => {
  console.log('from packages/elements-dev-portal/src/components/TableOfContents/TableOfContents.tsx');
  return (
    <Flex bg={isInResponsiveMode ? 'canvas' : 'canvas-100'} {...boxProps} flexDirection="col" maxH="full">
      <Flex flexGrow flexShrink overflowY="auto">
        <GroupProvider>
          <ElementsTableOfContents
            tree={tableOfContents.items}
            activeId={activeId}
            Link={Link}
            maxDepthOpenByDefault={collapseTableOfContents ? 0 : 1}
            externalScrollbar={externalScrollbar}
            onLinkClick={onLinkClick}
            isInResponsiveMode={isInResponsiveMode}
          />
        </GroupProvider>
      </Flex>

      {tableOfContents.hide_powered_by ? null : (
        <PoweredByLink
          source={activeId}
          pathname={typeof window !== 'undefined' ? window.location.pathname : ''}
          packageType="elements-dev-portal"
        />
      )}
    </Flex>
  );
};
