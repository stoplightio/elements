import { Icon, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export interface IVersionSelect {
  className?: string;
  version?: string;
  versions?: string[];
}

export const VersionSelect: React.FunctionComponent<IVersionSelect> = ({ className, version = '0', versions }) => {
  const [currentVersion, setCurrentVersion] = React.useState(version);
  const onChange = React.useCallback(e => setCurrentVersion(e.target.value), [setCurrentVersion]);

  return (
    <div className={cn('cursor-pointer', className)}>
      <Tag round intent="primary">
        <>
          <select
            className="cursor-pointer bg-transparent pr-4 z-1"
            style={{ appearance: 'none', WebkitAppearance: 'none' }}
            value={currentVersion}
            onChange={onChange}
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
  );
};
