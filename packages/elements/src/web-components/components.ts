import { createElementClass } from '@stoplight/elements-core';

import { API } from '../index';

export const ApiElement = createElementClass(API, {
  apiDescriptionUrl: { type: 'string', defaultValue: '' },
  apiDescriptionDocument: { type: 'string', defaultValue: '' },
  basePath: { type: 'string' },
  staticRouterPath: { type: 'string' },
  router: { type: 'string' },
  layout: { type: 'string' },
  hideTryItPanel: { type: 'boolean' },
  hideTryIt: { type: 'boolean' },
  hideSamples: { type: 'boolean' },
  hideServerInfo: { type: 'boolean' },
  hideSecurityInfo: { type: 'boolean' },
  hideSchemas: { type: 'boolean' },
  hideInternal: { type: 'boolean' },
  hideExport: { type: 'boolean' },
  logo: { type: 'string' },
  tryItCredentialsPolicy: { type: 'string' },
  tryItCorsProxy: { type: 'string' },
  withCredentials: { type: 'boolean' },
  sidebarTheme: { type: 'string' },
  sidebarHeader: { type: 'object' },
  maxRefDepth: { type: 'number' },
  renderExtensionAddon: { type: 'function' },
});
