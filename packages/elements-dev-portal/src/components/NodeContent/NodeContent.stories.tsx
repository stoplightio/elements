import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetNodeContent } from '../../hooks/useGetNodeContent';
import { NodeContent } from './';

// Wrapper to show how to use the node content hook
const NodeContentWrapper = ({
  nodeSlug,
  projectId,
  branchSlug,
}: {
  nodeSlug: string;
  projectId: string;
  branchSlug?: string;
}) => {
  const { data } = useGetNodeContent({ nodeSlug, projectId, branchSlug });

  return data ? (
    <NodeContent
      node={data}
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
    />
  ) : (
    <>Loading</>
  );
};

export default {
  title: 'Public/NodeContent',
  component: NodeContentWrapper,
  argTypes: {
    nodeSlug: { table: { category: 'Input' } },
    projectId: { table: { category: 'Input' } },
    branchSlug: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
  },
  args: {
    nodeSlug: 'b3A6Mzg5NDM2-create-todo',
    projectId: 'cHJqOjYwNjYx',
    branchSlug: '',
    platformUrl: 'https://stoplight.io',
  },
};

export const Playground: Story<{ nodeSlug: string; projectId: string; branchSlug?: string }> = args => (
  <NodeContentWrapper {...args} />
);

Playground.storyName = 'Create Todo';
