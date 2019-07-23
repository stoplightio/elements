import { NodeType } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { Method } from './HttpOperation/Method';
import { VersionSelect } from './VersionSelect';

export interface IPageHeader {
  type: NodeType;
  name: string;
  data: any;

  version?: string;
  versions?: string[];
  className?: string;
}

export const PageHeader: React.FunctionComponent<IPageHeader> = ({
  type,
  name,
  version,
  versions,
  className,
  data,
}) => {
  if (type === NodeType.Article) {
    return null;
  }

  return (
    <div className={cn('PageHeader', className)}>
      <div className="flex items-center">
        {type === NodeType.HttpOperation && <Method className="mr-2" method={data && data.method} />}

        <h2 className={cn(Classes.HEADING, 'mb-0')}>{name}</h2>

        <VersionSelect className="ml-2" version={version} versions={versions} />
      </div>
    </div>
  );
};
