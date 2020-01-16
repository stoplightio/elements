import { Classes, Icon } from '@stoplight/ui-kit';
import * as React from 'react';

import cn from 'classnames';
import { ActiveSrnContext } from '../..';
import { INodeInfo } from '../../types';

export interface IVersionSelector {
  node: INodeInfo;
}

export const VersionSelector: React.FunctionComponent<IVersionSelector> = ({ node }) => {
  const [srn, onChangeSrn] = React.useContext(ActiveSrnContext);

  if (!node.versions || node.versions.length < 2) return null;

  return (
    <span className={cn('ml-2 relative', Classes.ROUND, Classes.TAG)}>
      <select
        className="absolute inset-0 bg-transparent opacity-0 z-20 w-full cursor-pointer"
        style={{ appearance: 'none', WebkitAppearance: 'none' }}
        value={node.version}
        onChange={e => {
          const version = node.versions?.find(v => v.version === e.target.value);

          if (version) {
            console.log('srn', srn, 'onChangeSrn', onChangeSrn);
            onChangeSrn(srn);
          }
        }}
      >
        {node.versions.map((version, index) => (
          <option key={index} value={version.version}>
            v{version.version}
          </option>
        ))}
      </select>

      <span className="flex items-center h-full w-full">
        <div className="flex-1">v{node.version}</div>
        <Icon className="-mr-1" icon="caret-down" iconSize={14} />
      </span>
    </span>
  );
};
