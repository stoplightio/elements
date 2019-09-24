import { NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import * as React from 'react';

import { Method } from './HttpOperation/Method';
import { Path } from './HttpOperation/Path';

export interface IPageHeader extends IErrorBoundary {
  type: NodeType;
  name: string;
  data: any;

  className?: string;
}

export const ElementPageHeader: React.FunctionComponent<IPageHeader> = ({ type, name, className, data }) => {
  if (type === NodeType.Article) {
    return null;
  }

  const host = type === NodeType.HttpOperation && data.servers && data.servers[0] && data.servers[0].url;

  return (
    <div className={className}>
      <div className="py-1 flex items-center">
        {type === NodeType.HttpOperation && <Method className="mr-6" method={data && data.method} />}

        <h2 className="mb-0 font-medium text-2xl flex-1">{name}</h2>
      </div>

      {type === NodeType.HttpOperation && <Path className="mt-6 mb-2" host={host} path={data.path} />}
    </div>
  );
};

export const PageHeader = withErrorBoundary<IPageHeader>(ElementPageHeader, ['data'], 'ElementPageHeader');
