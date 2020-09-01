import '@stoplight/elements/styles/elements.scss';

import { StoplightProject } from '@stoplight/elements';
import React from 'react';

export const StoplightProjectDocs: React.FC = () => {
  return (
    <div>
      <StoplightProject
        basePath="stoplightProject"
        workspace="https://elements.stoplight.io"
        project="studio-demo"
      ></StoplightProject>
    </div>
  );
};
