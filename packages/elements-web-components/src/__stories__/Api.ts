import '../index';

import { createTemplate } from './util';

const Template = createTemplate('elements-api');

export default { title: 'API' };

export const TodosAPI = Template.bind({});
TodosAPI.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json',
};

export const ZoomApi = Template.bind({});
ZoomApi.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
};
ZoomApi.storyName = 'Complex API with inline `$ref`s';
