import '../index';

import { createTemplate } from './util';

const Template = createTemplate('elements-stoplight-project');

export default {
  title: 'Stoplight Project',
  argType: {
    workspace: { control: 'text' },
    project: { control: 'text' },
  },
};

export const defaultProject = Template.bind({});
defaultProject.storyName = 'Stoplight Demo workspace';
defaultProject.args = {
  workspace: 'https://demo.stoplight.io',
  project: 'public-apis',
};
