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

  const elem = children || 'Go To Ref';

  if (components.link) {
    const Link = components.link;

    return (
      <Link index={0} parent={null} path={['']} node={{ ...info, uri }}>
        {elem}
      </Link>
    );
  }

  return (
    <a
      className={cn('text-sm', className, Classes.TEXT_MUTED)}
      href={`/projects/${info.workspace}/${info.project}/nodes/${uri}?branch=${info.branch}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {elem}
    </a>
  );
};
