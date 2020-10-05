import { API, StoplightProject } from '@stoplight/elements';

import { createElementClass } from './createElementClass';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  workspaceSlug: { type: 'string', defaultValue: '' },
  project: { type: 'string', defaultValue: '' },
  branch: { type: 'string' },
  authToken: { type: 'string' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
});

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  layout: { type: 'string' },
});
