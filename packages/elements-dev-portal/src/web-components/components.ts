import { createElementClass } from '@stoplight/elements/web-components/createElementClass';

import { StoplightProject } from '../index';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  projectId: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
});
