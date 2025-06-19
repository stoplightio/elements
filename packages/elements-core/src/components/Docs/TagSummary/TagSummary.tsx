import { Box, Heading, VStack } from '@stoplight/mosaic';
import { INodeTag } from '@stoplight/types';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '../';

export interface TagSummaryProps extends DocsComponentProps<INodeTag> {
  tagName: string;
}

export const TagSummary: React.FC<TagSummaryProps> = ({ data, tagName }) => {
  if (!data?.description) {
    return null;
  }

  return (
    <VStack spacing={6} p={6}>
      <Box>
        <Heading size={1} mb={4}>
          {tagName}
        </Heading>
        <MarkdownViewer markdown={data.description} />
      </Box>
    </VStack>
  );
};

TagSummary.displayName = 'TagSummary'; 