import { NodeType } from '@stoplight/types';
import { Classes, Icon, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export interface IPageHeader {
  type: NodeType;
  name: string;
  data: any;
  version?: string;
  versions?: string[];

  summary?: string;
  className?: string;
}

export const PageHeader: React.FunctionComponent<IPageHeader> = ({
  type,
  name,
  summary,
  version = '0',
  versions,
  data,
  className,
}) => {
  const [currentVersion, setCurrentVersion] = React.useState(version);

  return (
    <div className={cn('PageHeader', className, 'mt-4')}>
      <div className="flex items-center">
        <h2 className={cn(Classes.HEADING, 'mb-0')}>{name}</h2>

        <div className="ml-4 cursor-pointer">
          <Tag round intent="primary">
            <>
              <select
                className="cursor-pointer bg-transparent pr-4 z-1"
                style={{ appearance: 'none', WebkitAppearance: 'none' }}
                value={currentVersion}
                onChange={e => {
                  setCurrentVersion(e.target.value);
                }}
              >
                {(versions || [version]).map(v => (
                  <option key={v} value={v}>
                    v{v}
                  </option>
                ))}
              </select>

              <Icon className="absolute -ml-3" icon="caret-down" iconSize={14} />
            </>
          </Tag>
        </div>
      </div>
    </div>
  );
};
