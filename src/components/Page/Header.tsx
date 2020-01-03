import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import { first, get } from 'lodash';
import * as React from 'react';

import { deserializeSrn, serializeSrn } from '@stoplight/path';
import { Classes, Icon, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { ActiveSrnContext } from '../../containers/Provider';
import { INodeInfo } from '../../types';
import { Method } from '../HttpOperation/Method';
import { Path } from '../HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  node: INodeInfo;

  className?: string;
  actions?: (props: { node: INodeInfo }) => React.ReactElement | null;
}

const PageHeaderComponent: React.FunctionComponent<IPageHeader> = ({ node, className, actions }) => {
  const [srn, onChangeSrn] = React.useContext(ActiveSrnContext);

  if (!node.name) return null;

  const isHttpOperation = node.type === NodeType.HttpOperation;
  const method = isHttpOperation && get(node, 'data.method');
  const host = isHttpOperation && get(node, 'data.servers[0].url');
  const path = isHttpOperation && get(node, 'data.path');

  let versionSelector;
  let versionTag;
  const { versions } = node;
  const latestVersion = get(first(versions), 'version');

  if (node.versions && node.versions.length > 1) {
    versionSelector = (
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

    versionTag =
      node.version === latestVersion ? (
        <Tag round intent="success" className="ml-2">
          Latest
        </Tag>
      ) : (
        <Tag round intent="warning" className="ml-2">
          Not Latest
        </Tag>
      );
  } else {
    versionTag = (
      <Tag round className="ml-2">
        Not Versioned
      </Tag>
    );
  }

  return (
    <div className={className}>
      <div className="flex p-3 -ml-5">
        {versionSelector}
        {versionTag}
      </div>
      <div className="flex items-center">
        {method && <Method className="mr-5" method={method} />}

        <h2 className="font-medium text-2xl flex-1">{node.name}</h2>

        {actions && actions({ node })}
      </div>

      {path && <Path className="flex-1 mt-5 mb-1" host={host} path={path} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(PageHeaderComponent, ['node'], 'PageHeader');
