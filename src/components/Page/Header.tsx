import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import { get } from 'lodash';
import * as React from 'react';

import { Classes, Icon, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { INodeInfo } from '../../types';
import { NodeTypeColors, NodeTypePrettyName } from '../../utils/node';
import { Method } from '../HttpOperation/Method';
import { Path } from '../HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  node: INodeInfo;

  className?: string;
  actions?: (props: { node: INodeInfo }) => React.ReactElement | null;
}

const PageHeaderComponent: React.FunctionComponent<IPageHeader> = ({ node, className, actions }) => {
  if (!node.name) return null;

  const [currentVersion, setCurrentVersion] = React.useState(node.version);

  const isHttpOperation = node.type === NodeType.HttpOperation;
  const method = isHttpOperation && get(node, 'data.method');
  const host = isHttpOperation && get(node, 'data.servers[0].url');
  const path = isHttpOperation && get(node, 'data.path');

  // const hasVersion = node.latestVersion && node.latestVersion !== '0.0';
  let versionSelector;
  // let versionTag;

  // if (hasVersion) {
  if (node.versions && node.versions.length > 1) {
    versionSelector = (
      <span className={cn('ml-2 relative', Classes.ROUND, Classes.TAG)}>
        <select
          className="absolute inset-0 bg-transparent opacity-0 z-20 w-full cursor-pointer"
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
          value={node.version}
          onChange={e => {
            setCurrentVersion(e.target.value);

            // const version = node.versions.find(v => v.version === e.target.value);

            // if (version) {
            //   routerStore.setQuery(
            //     { srn: serializeSrn({ ...deserializeSrn(routerStore.query.srn || ''), uri: version.uri }) },
            //     { merge: true },
            //   );
            // }
          }}
        >
          {node.versions.map(version => (
            <option key={version} value={version}>
              v{version}
            </option>
          ))}
        </select>

        <span className="flex items-center h-full w-full">
          <div className="flex-1">v{currentVersion}</div>
          <Icon className="-mr-1" icon="caret-down" iconSize={14} />
        </span>
      </span>
    );
    // }

    //   versionTag = node.latestVersion ? (
    //     <Tag round intent="success" className="ml-2">
    //       Latest
    //     </Tag>
    //   ) : (
    //     <Tag round intent="warning" className="ml-2">
    //       Not Latest
    //     </Tag>
    //   );
    // } else {
    //   versionTag = (
    //     <Tag round className="ml-2">
    //       Not Versioned
    //     </Tag>
    //   );
  }

  return (
    <div className={className}>
      <div className="flex p-3">
        {versionSelector}
        {/* {versionTag} */}
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
