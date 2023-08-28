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
  onLinkClick?(): void;
  dropdown?: boolean;
};

export const TableOfContents = ({
  tableOfContents,
  activeId,
  Link,
  collapseTableOfContents = false,
  externalScrollbar,
  onLinkClick,
  dropdown,
  ...boxProps
}: TableOfContentsProps) => {
  return (
    <Flex bg="canvas-100" {...boxProps} flexDirection="col" maxH="full">
      <Flex flexGrow flexShrink overflowY="auto">
        <ElementsTableOfContents
          tree={tableOfContents.items}
          activeId={activeId}
          Link={Link}
          maxDepthOpenByDefault={collapseTableOfContents ? 0 : 2}
          externalScrollbar={externalScrollbar}
          onLinkClick={onLinkClick}
          dropdown={dropdown}
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
