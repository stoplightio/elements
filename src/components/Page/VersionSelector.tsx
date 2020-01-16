import { Classes, Icon } from '@stoplight/ui-kit';
import * as React from 'react';

import { deserializeSrn, serializeSrn } from '@stoplight/path';
import cn from 'classnames';
import { OnChangeSrn } from '../..';
import { INodeInfo } from '../../types';

export interface IVersionSelector {
  node: INodeInfo;
  srn: string;
  onChangeSrn: OnChangeSrn;
}

export const VersionSelector: React.FunctionComponent<IVersionSelector> = ({ node, srn, onChangeSrn }) => {
  if (!node.versions || node.versions.length < 2) return null;

  return (
    <span className={cn('ml-2 relative', Classes.ROUND, Classes.TAG)}>
      <select
        className="absolute inset-0 bg-transparent opacity-0 z-20 w-full cursor-pointer"
        style={{ appearance: 'none', WebkitAppearance: 'none' }}
        value={node.version}
        onChange={e => {
          const version = e.currentTarget.value;
          const nodeUri = node.versions?.find(v => version === v.version)?.uri;
          onChangeSrn(serializeSrn({ ...deserializeSrn(srn), uri: nodeUri }));
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
