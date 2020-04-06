import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

import { ActiveInfoContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';

export const GoToRef: React.FC<{
  uri: string;
  className?: string;
}> = ({ uri, className, children }) => {
  const components = useComponents();
  const info = React.useContext(ActiveInfoContext);

  if (components.link) {
    const Link = components.link;

    return (
      <Link index={0} parent={null} path={['']} node={{ ...info, node: uri, url: uri }}>
        {children}
      </Link>
    );
  }

  let query;
  if (info.branch) {
    query = `?branch=${info.branch}`;
  }

  return (
    <a
      className={cn('text-sm', className, Classes.TEXT_MUTED)}
      href={`${info.host}/api/v1/projects/${info.workspace}/${info.project}/nodes/${uri}${query}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
