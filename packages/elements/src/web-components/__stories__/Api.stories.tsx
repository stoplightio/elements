import '../index';

import { parse } from '@stoplight/yaml';
import React from 'react';

import { zoomApiYaml } from '../../__fixtures__/api-descriptions/zoomApiYaml';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elements-api': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Template = (props: any) => <elements-api {...props} />;

export default {
  title: 'web-components/API',
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
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/todo.v1.yaml',
};

export const TodosAPIWithFixHeight = (props: any) => (
  <div style={{ height: 400 }}>
    <elements-api {...props} />
  </div>
);
TodosAPIWithFixHeight.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/todo.v1.yaml',
};
TodosAPIWithFixHeight.storyName = 'TodosAPI with fixed height';

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
