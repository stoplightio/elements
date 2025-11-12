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
  return (
    <Flex bg={isInResponsiveMode ? 'canvas' : 'canvas-100'} {...boxProps} flexDirection="col" maxH="full">
      <Flex flexGrow flexShrink overflowY="auto">
        <ElementsTableOfContents
          tree={tableOfContents.items}
          activeId={activeId}
          Link={Link}
          maxDepthOpenByDefault={collapseTableOfContents ? 0 : 1}
          externalScrollbar={externalScrollbar}
          onLinkClick={onLinkClick}
          isInResponsiveMode={isInResponsiveMode}
        />
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
