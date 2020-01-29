import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import { first, get } from 'lodash';
import * as React from 'react';

import { Tag, Tooltip } from '@stoplight/ui-kit';
import { INodeInfo } from '../../types';
import { NodeTypeColors, NodeTypePrettyName } from '../../utils/node';
import { Method } from '../HttpOperation/Method';
import { Path } from '../HttpOperation/Path';
import { VersionSelector } from './VersionSelector';

export interface IPageHeader extends IErrorBoundary {
  node: INodeInfo;

  className?: string;
  actions?: (props: { node: INodeInfo }) => React.ReactElement | null;
}

const PageHeaderComponent: React.FunctionComponent<IPageHeader> = ({ node, className, actions }) => {
  if (!node.name) return null;

  const isHttpOperation = node.type === NodeType.HttpOperation;
  const method = isHttpOperation && get(node, 'data.method');
  const host = isHttpOperation && get(node, 'data.servers[0].url');
  const path = isHttpOperation && get(node, 'data.path');

  let versionTag;
  const { versions } = node;
  const latestVersion = get(first(versions), 'version');

  if (node.versions && node.versions.length > 1) {
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
      <div className="flex items-center pb-2">
        <div className="flex-1">
          <Tag round className="dark:text-white" style={{ backgroundColor: NodeTypeColors[node.type] || undefined }}>
            {NodeTypePrettyName[node.type] || node.type}
          </Tag>
          {node.isCommon && (
            <Tooltip
              content={`This ${
                NodeTypePrettyName[node.type]
              } is part of the design library. Reference this in your designs when possible to reduce duplication and increase consistency.`}
            >
              <Tag round className="ml-2">
                Design Library
              </Tag>
            </Tooltip>
          )}
          {node.versions && node.versions.length > 1 && <VersionSelector node={node} />}
          {versionTag}
        </div>
        {actions && actions({ node })}
      </div>
      <div className="flex pt-3">
        {method && <Method className="mr-5" method={method} />}

        <h2 className="font-medium text-2xl flex-1">{node.name}</h2>
      </div>

      {path && <Path className="flex-1 mt-5 mb-1" host={host} path={path} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(PageHeaderComponent, ['node'], 'PageHeader');
