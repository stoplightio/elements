import '../index';

import { text, withKnobs } from '@storybook/addon-knobs';

export default { title: 'Stoplight Project', decorators: [withKnobs] };

export const defaultProject = () =>
  `<stoplight-project-component workspace='${text('workspace', 'http://meta.localhost:8080')}' project='${text(
    'project',
    'studio-demo',
  )}' />`;
