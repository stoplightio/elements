import '@stoplight/elements/styles.min.css';

import { StoplightProject } from '@stoplight/elements-dev-portal';
import React from 'react';

export const StoplightProjectDocs: React.FC = () => {
  return <StoplightProject basePath="stoplight-project" workspaceSlug="elements-examples" projectSlug="studio-demo" />;
};
