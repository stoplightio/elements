import { Classes, Icon, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export interface IPageHeader {
  name: string;

  version?: string;
  versions?: string[];
  className?: string;
}

export const PageHeader: React.FunctionComponent<IPageHeader> = ({ name, version = '0', versions, className }) => {
  const [currentVersion, setCurrentVersion] = React.useState(version);

  return (
    <div className={cn('PageHeader', className)}>
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
