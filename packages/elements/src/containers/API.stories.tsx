import { parse } from '@stoplight/yaml';
import { Story } from '@storybook/react';
import * as React from 'react';

import { zoomApiYaml } from '../__fixtures__/api-descriptions/zoomApiYaml';
import { API, APIProps } from './API';

export default {
  title: 'Public/API',
  component: API,
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

const Template: Story<APIProps> = args => <API {...args} />;

export const TodosAPI = Template.bind({});
TodosAPI.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json',
};
TodosAPI.storyName = 'Simple API from URL';

export const APIWithYamlProvidedDirectly = Template.bind({});
APIWithYamlProvidedDirectly.args = {
  apiDescriptionDocument: zoomApiYaml,
};
APIWithYamlProvidedDirectly.storyName = 'Direct YAML Input';

export const APIWithJSONProvidedDirectly = Template.bind({});
APIWithJSONProvidedDirectly.args = {
  apiDescriptionDocument: JSON.stringify(parse(zoomApiYaml), null, '  '),
};
APIWithJSONProvidedDirectly.storyName = 'Direct JSON Input';
