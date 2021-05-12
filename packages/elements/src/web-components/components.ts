import { createElementClass } from '@stoplight/elements-core/web-components/createElementClass';

import { API } from '../index';

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  apiDescriptionDocument: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  layout: { type: 'string' },
});
