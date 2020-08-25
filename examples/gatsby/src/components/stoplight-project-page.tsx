import '@stoplight/elements/styles/elements.scss';
import '../styles/stoplight.scss';

import { StoplightProject } from '@stoplight/elements';
import { InputGroup } from '@stoplight/ui-kit';
import React from 'react';

const StoplightProjectPage = ({ basePath }: { basePath: string }) => {
  const [workspaceUrl, setWorkspaceUrl] = React.useState('https://demo.stoplight.io');
  const [project, setProject] = React.useState('public-apis');
  const [branch, setBranch] = React.useState('');

  return (
    <div className="flex flex-col h-full w-2/3 mx-auto">
      <div className="flex mx-auto mb-4">
        <InputGroup
          className="mt-4 mr-6"
          name="workspace"
          id="workspace"
          placeholder="Workspace URL"
          defaultValue={workspaceUrl}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => setWorkspaceUrl(e.target.value)}
        />
        <InputGroup
          className="mt-4 mr-6"
          name="project"
          id="project"
          placeholder="Project Slug"
          defaultValue={project}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)}
        />
        <InputGroup
          className="mt-4 mr-6"
          name="branch"
          id="branch"
          placeholder="Branch Slug"
          defaultValue={branch}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => setBranch(e.target.value)}
        />
      </div>
      {workspaceUrl && project && (
        <StoplightProject basePath={basePath} workspace={workspaceUrl} project={project} branch={branch} />
      )}
    </div>
  );
};

export default StoplightProjectPage;
