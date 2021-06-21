import {
  CustomLinkComponent,
  PoweredByLink,
  TableOfContents as ElementsTableOfContents,
} from '@stoplight/elements-core';
import { Box, BoxProps } from '@stoplight/mosaic';
import * as React from 'react';

import { ProjectTableOfContents } from '../../types';

export type TableOfContentsProps = BoxProps<'div'> & {
  activeId: string;
  tableOfContents: ProjectTableOfContents;
  Link: CustomLinkComponent;
  collapseTableOfContents?: boolean;
};

export const TableOfContents = ({
  tableOfContents,
  activeId,
  Link,
  collapseTableOfContents = false,
  ...boxProps
}: TableOfContentsProps) => {
  return (
    <Box bg="canvas-100" {...boxProps}>
      <ElementsTableOfContents
        tree={tableOfContents.items}
        activeId={activeId}
        Link={Link}
        maxDepthOpenByDefault={collapseTableOfContents ? 0 : 1}
      />

      {tableOfContents.hide_powered_by ? null : (
        <PoweredByLink
          source={activeId}
          pathname={typeof window !== 'undefined' ? window.location.pathname : ''}
          packageType="elements-dev-portal"
        />
      )}
    </Box>
  );
};
