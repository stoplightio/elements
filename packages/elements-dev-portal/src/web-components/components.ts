import { createElementClass } from '@stoplight/elements-core';

import { StoplightProject } from '../containers/StoplightProject';

export const StoplightProjectElement = createElementClass(StoplightProject, {
  projectId: { type: 'string', defaultValue: '' },
  hideTryIt: { type: 'boolean' },
  hideMocking: { type: 'boolean' },
  hideExport: { type: 'boolean' },
  basePath: { type: 'string' },
  router: { type: 'string' },
  platformUrl: { type: 'string' },
  collapseTableOfContents: { type: 'boolean' },
});
