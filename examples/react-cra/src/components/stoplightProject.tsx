import '@stoplight/elements/styles/elements.scss';

import { StoplightProject } from '@stoplight/elements';
import React from 'react';

export const StoplightProjectDocs: React.FC = () => {
  return (
    <div className="stoplight-container">
      <StoplightProject basePath="stoplight-project" workspace="elements" project="studio-demo" />
    </div>
  );
};
