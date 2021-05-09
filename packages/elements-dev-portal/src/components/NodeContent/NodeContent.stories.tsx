import { Story } from '@storybook/react';
import { useNodeContent } from 'elements-dev-portal/src/hooks/useNodeContent';
import * as React from 'react';

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
  const { data } = useNodeContent({ nodeSlug, projectId, branchSlug });

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
    nodeSlug: 'b3A6MTE0-create-todo',
    projectId: 'cHJqOjY',
    branchSlug: '',
    platformUrl: 'https://x-6195.stoplight-dev.com',
  },
};

export const Playground: Story<{ nodeSlug: string; projectId: string; branchSlug?: string }> = args => (
  <NodeContentWrapper {...args} />
);

Playground.storyName = 'Create Todo';
