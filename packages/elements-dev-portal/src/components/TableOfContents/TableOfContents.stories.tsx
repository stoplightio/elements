import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetTableOfContents } from '../../hooks/useGetTableOfContents';
import { TableOfContents } from './';

// Wrapper to show how to use the node content hook
const TableOfContentsWrapper = ({
  projectId,
  branchSlug,
  isInResponsiveMode,
}: {
  projectId: string;
  branchSlug?: string;
  isInResponsiveMode?: boolean;
}) => {
  const { data } = useGetTableOfContents({ projectId, branchSlug });

  return data ? (
    <TableOfContents
      isInResponsiveMode={isInResponsiveMode}
      activeId="b3A6MTE0"
      tableOfContents={data}
      Link={({ children, ...props }) => {
        return (
          <a
            onClick={() => {
              console.log('Link clicked!', props);
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
    <>Loading</>
  );
};

export default {
  title: 'Public/TableOfContents',
  component: TableOfContentsWrapper,
  argTypes: {
    projectId: { table: { category: 'Input' } },
    branchSlug: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
    isInResponsiveMode: { table: { category: 'Input' } },
  },
  args: {
    projectId: 'cHJqOjYwNjYx',
    branchSlug: '',
    platformUrl: 'https://stoplight.io',
    isInResponsiveMode: false,
  },
};

export const Playground: Story<{
  nodeSlug: string;
  projectId: string;
  branchSlug?: string;
  isInResponsiveMode?: boolean;
}> = args => <TableOfContentsWrapper {...args} />;

Playground.storyName = 'Studio Demo';
