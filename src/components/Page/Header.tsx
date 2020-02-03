import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import { get } from 'lodash';
import * as React from 'react';

import { Tag, Tooltip } from '@stoplight/ui-kit';
import { ActiveSrnContext } from '../..';
import { INodeInfo } from '../../types';
import { NodeTypePrettyName } from '../../utils/node';
import { Method } from '../HttpOperation/Method';
import { Path } from '../HttpOperation/Path';
import { VersionSelector } from './VersionSelector';

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

  return (
    <div className={className}>
      <div className="flex items-center pb-2">
        <div className="flex-1">
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
        </div>
      </div>
      <div className="flex pt-3 items-center">
        {method && <Method className="mr-5" method={method} />}
        <div className="flex flex-1 items-center">
          <h2 className="font-medium text-2xl">{node.name}</h2>
          {node.versions && node.versions.length > 1 && (
            <VersionSelector node={node} srn={srn} onChangeSrn={onChangeSrn} />
          )}
        </div>
        {actions && actions({ node })}
      </div>

      {path && <Path className="flex-1 mt-5 mb-1" host={host} path={path} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(PageHeaderComponent, ['node'], 'PageHeader');
