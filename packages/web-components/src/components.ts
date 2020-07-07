import { SchemaViewer } from '@stoplight/elements/dist/components/SchemaViewer';
import { TryIt } from '@stoplight/elements/dist/components/TryIt';

import { createElementClass } from './createElementClass';

export const SchemaViewerComponentElement = createElementClass(SchemaViewer, {
  schema: { type: 'object', defaultValue: { type: 'any' } },
  title: { type: 'string' },
  className: { type: 'string' },
  description: { type: 'string' },
});

export const TryItComponentElement = createElementClass(TryIt, {
  nodeType: { type: 'string', defaultValue: 'http_operation' },
  nodeData: { type: 'object', defaultValue: {} },
});
