import { createElementClass } from '@abbudao/elements-core';

import { API } from '../index';

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  apiDescriptionDocument: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  staticRouterPath: { type: 'string' },
  router: { type: 'string' },
  layout: { type: 'string' },
  hideTryIt: { type: 'boolean' },
  hideSchemas: { type: 'boolean' },
  hideInternal: { type: 'boolean' },
  hideExport: { type: 'boolean' },
  logo: { type: 'string' },
  tryItCredentialsPolicy: { type: 'string' },
  tryItCorsProxy: { type: 'string' },
  customDocs: { type: 'object' },
});
