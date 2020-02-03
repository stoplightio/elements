import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import { get } from 'lodash';
import * as React from 'react';

import { INodeInfo } from '../../types';
import { Method } from '../HttpOperation/Method';
import { Path } from '../HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  node: INodeInfo;
  group?: string;

  className?: string;
  actions?: (props: { node: INodeInfo }) => React.ReactElement | null;
}

const PageHeaderComponent: React.FunctionComponent<IPageHeader> = ({ node, group, className, actions }) => {
  if (!node.name) return null;

  const isHttpOperation = node.type === NodeType.HttpOperation;
  const method = isHttpOperation && get(node, 'data.method');
  const host = isHttpOperation && get(node, 'data.servers[0].url');
  const path = isHttpOperation && get(node, 'data.path');

  return (
    <div className={className}>
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
