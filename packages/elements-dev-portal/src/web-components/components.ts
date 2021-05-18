import { createElementClass } from '@stoplight/elements-core/web-components/createElementClass';

import { StoplightProject } from '../containers/StoplightProject';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  projectId: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
});
