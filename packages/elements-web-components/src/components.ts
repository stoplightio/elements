import { API, StoplightProject } from '@stoplight/elements';

import { createElementClass } from './createElementClass';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  workspaceSlug: { type: 'string', defaultValue: '' },
  projectSlug: { type: 'string', defaultValue: '' },
  branchSlug: { type: 'string' },
  authToken: { type: 'string' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
});

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  apiDescriptionDocument: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  layout: { type: 'string' },
});
