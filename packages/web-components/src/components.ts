import { SchemaViewer } from '@stoplight/elements/dist/components/SchemaViewer';

import { createElementClass } from './createElementClass';

export const SchemaViewerComponentElement = createElementClass(SchemaViewer, {
  schema: { type: 'object', defaultValue: { type: 'any' } },
  title: { type: 'string' },
  className: { type: 'string' },
  description: { type: 'string' },
});
