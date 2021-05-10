import { TableOfContents as ElementsTableOfContents } from '@stoplight/elements/components/MosaicTableOfContents';
import { CustomLinkComponent } from '@stoplight/elements/components/MosaicTableOfContents/types';
import { PoweredByLink } from '@stoplight/elements/components/PoweredByLink';
import { Box, BoxProps, Flex } from '@stoplight/mosaic';
import * as React from 'react';

import { TableOfContents as TableOfContentsData } from '../../interfaces/tableOfContents';
import { BranchSelector, BranchSelectorProps } from '../BranchSelector';

export type TableOfContentsProps = BranchSelectorProps &
  Omit<BoxProps<'div'>, 'onChange'> & {
    activeId: string;
    tableOfContents: TableOfContentsData;
    Link: CustomLinkComponent;
  };

export const TableOfContents = ({
  tableOfContents,
  activeId,
  Link,
  branchSlug,
  branches,
  onChange,
  ...boxProps
}: TableOfContentsProps) => {
  return (
    <Flex direction="col" bg="canvas-100" h="full" {...boxProps}>
      <BranchSelector branchSlug={branchSlug} branches={branches} onChange={onChange} />

      <Box flex={1}>
        <ElementsTableOfContents tree={tableOfContents.items} activeId={activeId} Link={Link} />
      </Box>

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
