import { Box } from '@stoplight/mosaic';
import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetBranches } from '../../hooks/useGetBranches';
import { BranchSelector } from './';

// Wrapper to show how to use the node content hook
const BranchSelectorWrapper = ({ projectId }: { projectId: string }) => {
  const [branchSlug, setBranchSlug] = React.useState('master');
  const { data } = useGetBranches({ projectId });

  if (data) {
    return (
      <Box mt={10} w={40}>
        <BranchSelector branchSlug={branchSlug} branches={data} onChange={branch => setBranchSlug(branch.slug)} />
      </Box>
    );
  }

  return <Box>Loading</Box>;
};

export default {
  title: 'Public/BranchSelector',
  component: BranchSelectorWrapper,
  argTypes: {
    projectId: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
  },
  args: {
    projectId: 'cHJqOjYwNjYx',
    platformUrl: 'https://stoplight.io',
  },
};

export const Playground: Story<{ nodeSlug: string; projectId: string; branchSlug?: string }> = args => (
  <BranchSelectorWrapper {...args} />
);

Playground.storyName = 'Studio Demo';
