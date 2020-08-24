import '../index';

import { text, withKnobs } from '@storybook/addon-knobs';

export default { title: 'Api', decorators: [withKnobs] };

export const defaultApi = () =>
  `<stoplight-api apiDescriptionUrl='${text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json',
  )}' />`;
