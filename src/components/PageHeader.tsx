import { Button, ButtonGroup } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import * as React from 'react';

import { Method } from './HttpOperation/Method';
import { Path } from './HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  type: NodeType;
  name: string;
  srn?: string;
  data: any;
  className?: string;
  actions?: (props: { type: NodeType; name: string; srn?: string }) => React.ReactElement | null;
}

export const ElementPageHeader: React.FunctionComponent<IPageHeader> = ({
  type,
  name,
  srn,
  className,
  data,
  actions,
}) => {
  if (type === NodeType.Article) {
    return null;
  }

  const host = type === NodeType.HttpOperation && data.servers && data.servers[0] && data.servers[0].url;

  return (
    <div className={className}>
      <div className="flex items-center">
        {type === NodeType.HttpOperation && <Method className="mr-5" method={data && data.method} />}

        <h2 className="font-medium text-2xl flex-1">{name}</h2>

        {actions && actions({ type, name, srn })}
      </div>

      {type === NodeType.HttpOperation && <Path className="flex-1 mt-5 mb-1" host={host} path={data.path} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(ElementPageHeader, ['data'], 'ElementPageHeader');
