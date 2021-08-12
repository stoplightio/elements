import { parse } from '@stoplight/yaml';
import { Story } from '@storybook/react';
import * as React from 'react';

import { simpleApiWithInternalOperations } from '../__fixtures__/api-descriptions/simpleApiWithInternalOperations';
import { simpleApiWithoutDescription } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { todosApiBundled } from '../__fixtures__/api-descriptions/todosApiBundled';
import { zoomApiYaml } from '../__fixtures__/api-descriptions/zoomApiYaml';
import { API, APIProps } from './API';

export default {
  title: 'Public/API',
  component: API,
  argTypes: {
    apiDescriptionDocument: { control: 'text', type: { required: false }, table: { category: 'Input' } },
    apiDescriptionUrl: { control: 'text', table: { category: 'Input' } },
    layout: {
      control: { type: 'inline-radio' },
      table: { category: 'UI' },
    },
    basePath: { table: { category: 'Routing' } },
    router: { table: { category: 'Routing' } },
  },
  args: {
    router: 'memory',
  },
};

const Template: Story<APIProps> = args => <API {...args} />;

export const APIWithYamlProvidedDirectly = Template.bind({});
APIWithYamlProvidedDirectly.args = {
  apiDescriptionDocument: zoomApiYaml,
};
APIWithYamlProvidedDirectly.storyName = 'Direct YAML Input (Zoom)';

export const APIWithJSONProvidedDirectly = Template.bind({});
APIWithJSONProvidedDirectly.args = {
  apiDescriptionDocument: JSON.stringify(parse(zoomApiYaml), null, '  '),
};
APIWithJSONProvidedDirectly.storyName = 'Direct JSON Input (Zoom)';

export const APIWithoutDescription = Template.bind({});
APIWithoutDescription.args = {
  apiDescriptionDocument: simpleApiWithoutDescription,
};
APIWithoutDescription.storyName = 'API Without Description';

export const APIWithInternalOperations = Template.bind({});
APIWithInternalOperations.args = {
  apiDescriptionDocument: simpleApiWithInternalOperations,
};
APIWithInternalOperations.storyName = 'API With Internal Operations';

export const OpenApi3Schema = Template.bind({});
OpenApi3Schema.args = {
  apiDescriptionDocument: todosApiBundled,
};
OpenApi3Schema.storyName = 'Open Api 3.0 Schema';

export const StackedLayout = Template.bind({});
StackedLayout.args = {
  apiDescriptionDocument: JSON.stringify(parse(zoomApiYaml), null, '  '),
  layout: 'stacked',
};
StackedLayout.storyName = 'Stacked Layout (Zoom)';

export const Box = Template.bind({});
Box.args = {
  apiDescriptionUrl: 'https://raw.githubusercontent.com/box/box-openapi/main/content/openapi.yml',
};
Box.storyName = 'Box';

export const DigitalOcean = Template.bind({});
DigitalOcean.args = {
  apiDescriptionUrl:
    'https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml',
};
DigitalOcean.storyName = 'DigitalOcean';

export const Github = Template.bind({});
Github.args = {
  apiDescriptionUrl:
    'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.0/ghes-3.0.json',
};
Github.storyName = 'GitHub';

export const Instagram = Template.bind({});
Instagram.args = {
  apiDescriptionUrl: 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml',
};
Instagram.storyName = 'Instagram';
