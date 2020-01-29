import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { HostContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';

export const GoToRef: React.FC<{ title: string; srn: string; group?: string }> = ({ title, srn, children, group }) => {
  const host = React.useContext(HostContext);
  const components = useComponents();

  const elem = children || 'Go To Ref';

  if (components.link) {
    return components.link(
      {
        node: {
          title,
          url: srn,
          srn,
          group,
        },
        // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
        children: elem,
      },
      srn,
    );
  }
  return (
    <a
      className={cn('text-sm', Classes.TEXT_MUTED)}
      href={`${host}/nodes.raw?srn=${srn}${group ? `&group=${group}` : ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {elem}
    </a>
  );
};
