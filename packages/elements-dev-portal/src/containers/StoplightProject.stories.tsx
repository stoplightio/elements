import { Story } from '@storybook/react';
import * as React from 'react';

import { StoplightProject, StoplightProjectProps } from './StoplightProject';

export default {
  title: 'Public/StoplightProject',
  component: StoplightProject,
  argTypes: {
    projectId: { table: { category: 'Input' } },
    basePath: { table: { category: 'Routing' } },
    router: { table: { category: 'Routing' } },
    platformUrl: { table: { category: 'Advanced' } },
  },
  args: {
    router: 'memory',
    platformUrl: 'https://x-6195.stoplight-dev.com',
  },
};

export const Playground: Story<StoplightProjectProps> = args => <StoplightProject {...args} />;
Playground.storyName = 'Studio Demo';
Playground.args = {
  projectId: 'cHJqOjY',
  platformUrl: 'https://x-6195.stoplight-dev.com',
};
