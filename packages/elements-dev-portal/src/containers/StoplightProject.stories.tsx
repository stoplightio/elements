import { Story } from '@storybook/react';
import * as React from 'react';

import { StoplightProject, StoplightProjectProps } from './StoplightProject';

export default {
  title: 'Public/StoplightProject',
  component: StoplightProject,
  argTypes: {
    workspaceSlug: { table: { category: 'Input' } },
    projectSlug: { table: { category: 'Input' } },
    branchSlug: { table: { category: 'Input' } },
    authToken: { table: { category: 'Input' } },
    basePath: { table: { category: 'Routing' } },
    router: { table: { category: 'Routing' } },
    platformUrl: { table: { category: 'Advanced' } },
  },
  args: {
    router: 'memory',
  },
};

export const Playground: Story<StoplightProjectProps> = args => <StoplightProject {...args} />;
Playground.storyName = 'Studio Demo';
Playground.args = {
  workspaceSlug: 'elements-examples',
  projectSlug: 'studio-demo',
};

export const PublicApis: Story<StoplightProjectProps> = args => <StoplightProject {...args} />;
PublicApis.storyName = 'Public APIs';
PublicApis.args = {
  workspaceSlug: 'elements-examples',
  projectSlug: 'public-apis',
};
