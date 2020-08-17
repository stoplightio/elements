import { SchemaViewer, StoplightProject } from '@stoplight/elements';

import { createElementClass } from './createElementClass';

export const SchemaViewerComponentElement = createElementClass(SchemaViewer, {
  schema: { type: 'object', defaultValue: { type: 'any' } },
  title: { type: 'string' },
  className: { type: 'string' },
  description: { type: 'string' },
});

export const StoplightProjectComponentElement = createElementClass(StoplightProject, {
  workspace: { type: 'string', defaultValue: '' },
  project: { type: 'string', defaultValue: '' },
});
