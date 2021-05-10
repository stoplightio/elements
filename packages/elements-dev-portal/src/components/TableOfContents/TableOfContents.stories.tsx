import { Story } from '@storybook/react';
import { useGetBranches } from 'elements-dev-portal/src/hooks/useGetBranches';
import * as React from 'react';

import { useGetTableOfContents } from '../../hooks/useGetTableOfContents';
import { Loading } from '../Loading';
import { TableOfContents } from './';

// Wrapper to show how to use the node content hook
const TableOfContentsWrapper = ({ projectId }: { projectId: string }) => {
  const [activeId, setActiveId] = React.useState('b3A6MTE0');
  const [branchSlug, setBranchSlug] = React.useState('');
  const { data: tableOfContents } = useGetTableOfContents({ projectId, branchSlug });
  const { data: branches = [] } = useGetBranches({ projectId });

  return tableOfContents ? (
    <TableOfContents
      activeId={activeId}
      tableOfContents={tableOfContents}
      branchSlug={branchSlug || branches[0]?.slug}
      branches={branches}
      onChange={branch => {
        setBranchSlug(branch.slug);
      }}
      Link={({ children, to }) => {
        return (
          <a
            onClick={() => {
              setActiveId(to.split('-')[0]);
            }}
          >
            {children}
          </a>
        );
      }}
      style={{
        width: '300px',
      }}
    />
  ) : (
    <Loading />
  );
};

export default {
  title: 'Public/TableOfContents',
  component: TableOfContentsWrapper,
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
  <TableOfContentsWrapper {...args} />
);

Playground.storyName = 'Studio Demo';
