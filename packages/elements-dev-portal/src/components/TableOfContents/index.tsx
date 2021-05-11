import { TableOfContents as ElementsTableOfContents } from '@stoplight/elements-core/components/MosaicTableOfContents';
import { CustomLinkComponent } from '@stoplight/elements-core/components/MosaicTableOfContents/types';
import { PoweredByLink } from '@stoplight/elements-core/components/PoweredByLink';
import { Box, BoxProps } from '@stoplight/mosaic';
import * as React from 'react';

import { TableOfContents as TableOfContentsData } from '../../interfaces/tableOfContents';

export type TableOfContentsProps = BoxProps<'div'> & {
  activeId: string;
  tableOfContents: TableOfContentsData;
  Link: CustomLinkComponent;
};

export const TableOfContents = ({ tableOfContents, activeId, Link, ...boxProps }: TableOfContentsProps) => {
  return (
    <Box bg="canvas-100" {...boxProps}>
      <ElementsTableOfContents tree={tableOfContents.items} activeId={activeId} Link={Link} />

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
