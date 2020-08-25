import { API, SchemaViewer, StoplightProject } from '@stoplight/elements';

import { createElementClass } from './createElementClass';

export const SchemaViewerComponentElement = createElementClass(SchemaViewer, {
  schema: { type: 'object', defaultValue: { type: 'any' } },
  title: { type: 'string' },
  className: { type: 'string' },
  description: { type: 'string' },
});

export const StoplightProjectElement = createElementClass(StoplightProject, {
  workspace: { type: 'string', defaultValue: '' },
  project: { type: 'string', defaultValue: '' },
  branch: { type: 'string' },
  authToken: { type: 'string' },
  basePath: { type: 'string' },
  router: { type: 'string' },
});

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
});
