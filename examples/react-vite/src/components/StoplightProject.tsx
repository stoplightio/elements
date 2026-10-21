import '@stoplight/elements/styles.min.css';

import { StoplightProject } from '@stoplight/elements-dev-portal';

export const StoplightProjectDocs = () => {
  return (
    <StoplightProject
      router="history"
      basePath="stoplight-project"
      platformUrl="https://stoplight.io"
      projectId="cHJqOjYwNjYx"
    />
  );
};
