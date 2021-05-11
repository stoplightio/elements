import '../index';

import { zoomApiYaml } from '@stoplight/elements/src/__fixtures__/api-descriptions/zoomApiYaml';
import { parse } from '@stoplight/yaml';

import { createTemplate } from './util';

const Template = createTemplate('elements-api');

export default {
  title: 'API',
  argTypes: {
    apiDescriptionUrl: {
      control: 'text',
    },
    apiDescriptionDocument: { control: 'text' },
    layout: {
      control: { type: 'inline-radio', options: ['sidebar', 'stacked'] },
      defaultValue: 'sidebar',
    },
  },
};

export const TodosAPI = Template.bind({});
TodosAPI.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json',
};

export const ZoomApi = Template.bind({});
ZoomApi.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml',
};
ZoomApi.storyName = 'Complex API with inline `$ref`s';

export const APIWithYamlProvidedDirectly = Template.bind({});
APIWithYamlProvidedDirectly.args = {
  apiDescriptionDocument: zoomApiYaml,
};
APIWithYamlProvidedDirectly.storyName = 'API With Yaml Provided Directly';

export const APIWithJSONProvidedDirectly = Template.bind({});
APIWithJSONProvidedDirectly.args = {
  apiDescriptionDocument: JSON.stringify(parse(zoomApiYaml), null, '  '),
};
APIWithJSONProvidedDirectly.storyName = 'API With JSON Provided Directly';
