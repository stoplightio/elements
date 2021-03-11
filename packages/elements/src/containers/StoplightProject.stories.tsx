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

const Template: Story<StoplightProjectProps> = args => <StoplightProject {...args} />;

export const StudioDemo = Template.bind({});
StudioDemo.args = {
  workspaceSlug: 'elements',
  projectSlug: 'studio-demo',
};

export const PublicApis = Template.bind({});
PublicApis.args = {
  workspaceSlug: 'elements',
  projectSlug: 'public-apis',
};
