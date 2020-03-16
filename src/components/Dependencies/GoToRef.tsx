import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { HostContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';

export const GoToRef: React.FC<{
  className?: string;
  title: string;
  workspace: string;
  project: string;
  uri: string;
  branch: string;
}> = ({ className, title, workspace, project, uri, branch, children }) => {
  const host = React.useContext(HostContext);
  const components = useComponents();

  const elem = children || 'Go To Ref';

  if (components.link) {
    return components.link(
      {
        node: {
          className,
          title,
          url: uri,
          workspace,
          project,
          uri,
          branch,
        },
        // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
        children: elem,
      },
      uri,
    );
  }
  return (
    <a
      className={cn('text-sm', className, Classes.TEXT_MUTED)}
      href={`${host}/projects/${workspace}/${project}/nodes/${uri}?branch=${branch}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {elem}
    </a>
  );
};
