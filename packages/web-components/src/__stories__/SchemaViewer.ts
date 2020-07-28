import '../index';

import { object, withKnobs } from '@storybook/addon-knobs';

const defaultExampleSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['firstName'],
};

export default { title: 'Schema Viewer', decorators: [withKnobs] };

export const defaultState = () => '<stoplight-component-schema-viewer/>';

export const withSchemaAsAttribute = () =>
  `<stoplight-component-schema-viewer 
    schema='${JSON.stringify(object('JSON Schema', defaultExampleSchema))}'/>`;
