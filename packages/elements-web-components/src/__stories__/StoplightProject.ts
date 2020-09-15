import '../index';

import { createTemplate } from './util';

const Template = createTemplate('elements-stoplight-project');

export default { title: 'Stoplight Project' };

export const defaultProject = Template.bind({});
defaultProject.storyName = 'Stoplight Demo workspace';
defaultProject.args = {
  workspace: 'https://demo.stoplight.io',
  project: 'public-apis',
};
