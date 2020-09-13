import '../index';

import { text, withKnobs } from '@storybook/addon-knobs';

export default { title: 'Stoplight Project', decorators: [withKnobs] };

export const defaultProject = () =>
  `<elements-stoplight-project workspace='${text('workspace', 'http://demo.stoplight.io')}' project='${text(
    'project',
    'public-apis',
  )}' />`;
