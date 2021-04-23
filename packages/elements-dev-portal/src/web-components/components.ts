import { createElementClass } from '@stoplight/elements/dist/web-components/createElementClass';

import { StoplightProject } from '../index';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  workspaceSlug: { type: 'string', defaultValue: '' },
  projectSlug: { type: 'string', defaultValue: '' },
  branchSlug: { type: 'string' },
  authToken: { type: 'string' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
});
