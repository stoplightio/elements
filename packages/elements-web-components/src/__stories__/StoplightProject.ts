import '../index';

import { createTemplate } from './util';

const Template = createTemplate('elements-stoplight-project');

export default {
  title: 'Stoplight Project',
  argType: {
    workspaceSlug: { control: 'text' },
    projectSlug: { control: 'text' },
    platformUrl: { control: 'text' },
  },
};

export const defaultProject = Template.bind({});
defaultProject.storyName = "Stoplight's Demo workspace";
defaultProject.args = {
  workspaceSlug: 'demo',
  projectSlug: 'public-apis',
  platformUrl: 'https://stoplight.io',
};
