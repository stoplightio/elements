import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetBranches } from '../../hooks/useGetBranches';
import { BranchSelector } from './';

// Wrapper to show how to use the node content hook
const BranchSelectorWrapper = ({ projectId }: { projectId: string; branchSlug?: string }) => {
  const { data } = useGetBranches({ projectId });

  return data ? (
    <BranchSelector branchSlug="master" branches={data} onChange={branch => console.log(branch)} />
  ) : (
    <>Loading</>
  );
};

export default {
  title: 'Public/BranchSelector',
  component: BranchSelectorWrapper,
  argTypes: {
    projectId: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
  },
  args: {
    projectId: 'cHJqOjY',
    platformUrl: 'https://x-6195.stoplight-dev.com',
  },
};

export const Playground: Story<{ nodeSlug: string; projectId: string; branchSlug?: string }> = args => (
  <BranchSelectorWrapper {...args} />
);

Playground.storyName = 'Studio Demo';
