import { NodeType } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { Method } from './HttpOperation/Method';
import { Path } from './HttpOperation/Path';
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

  if (type === NodeType.HttpOperation) {
    const host = data.servers && data.servers[0] && data.servers[0].url;

    return (
      <div className={cn('PageHeader', className)}>
        <div className="flex items-center">
          <h2 className={cn(Classes.HEADING, 'mb-0')}>
            {type === NodeType.HttpOperation && <Method className="mr-2" method={data && data.method} />}
            {name}
          </h2>

          <div className="flex-1" />

          <VersionSelect className="ml-2" version={version} versions={versions} />
        </div>

        <Path className="mt-6" host={host} path={data.path} />
      </div>
    );
  }

  return (
    <div className={cn('PageHeader', className)}>
      <div className="flex items-center">
        <h2 className={cn(Classes.HEADING, 'mb-0')}>{name}</h2>

        <div className="flex-1" />

        <VersionSelect className="ml-2" version={version} versions={versions} />
      </div>
    </div>
  );
};
