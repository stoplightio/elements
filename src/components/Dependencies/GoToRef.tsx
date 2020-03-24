import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

import { useComponents } from '../../hooks/useComponents';

export const GoToRef: React.FC<{
  className?: string;
  title: string;
  workspace: string;
  project: string;
  uri: string;
  branch: string;
}> = ({ className, title, workspace, project, uri, branch, children }) => {
  const components = useComponents();

  const elem = children || 'Go To Ref';

  if (components.link) {
    const Link = components.link;

    return (
      <Link index={0} parent={null} path={['']} node={{ className, title, uri, workspace }}>
        {elem}
      </Link>
    );
  }

  return (
    <a
      className={cn('text-sm', className, Classes.TEXT_MUTED)}
      href={`/projects/${workspace}/${project}/nodes/${uri}?branch=${branch}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {elem}
    </a>
  );
};
