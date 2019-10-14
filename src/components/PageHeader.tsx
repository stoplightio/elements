import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import get from 'lodash/get';
import * as React from 'react';

import { INodeInfo } from '../types';
import { Method } from './HttpOperation/Method';
import { Path } from './HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  node: INodeInfo;

  className?: string;
  actions?: (props: { node: INodeInfo }) => React.ReactElement | null;
}

const PageHeaderComponent: React.FunctionComponent<IPageHeader> = ({ node, className, actions }) => {
  if (!node.name) return null;

  const isHttpOperation = node.type === NodeType.HttpOperation;

  const host = isHttpOperation && get(node, 'data.servers[0].url');

  return (
    <div className={className}>
      <div className="flex items-center">
        {isHttpOperation && <Method className="mr-5" method={get(node, 'data.method')} />}

        <h2 className="font-medium text-2xl flex-1">{node.name}</h2>

        {actions && actions({ node })}
      </div>

      {isHttpOperation && <Path className="flex-1 mt-5 mb-1" host={host} path={get(node, 'data.path')} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(PageHeaderComponent, ['node'], 'PageHeaderComponent');
