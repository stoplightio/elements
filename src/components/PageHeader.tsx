import { NodeType } from '@stoplight/types';
import { Button, Icon, Menu, MenuItem, Popover, Position } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { HostContext } from '../containers/Provider';
import { Method } from './HttpOperation/Method';
import { Path } from './HttpOperation/Path';
import { VersionSelect } from './VersionSelect';

export interface IPageHeader {
  type: NodeType;
  name: string;
  data: any;

  srn?: string;
  version?: string;
  versions?: string[];
  className?: string;
}

export const PageHeader: React.FunctionComponent<IPageHeader> = ({
  type,
  name,
  srn,
  version,
  versions,
  className,
  data,
}) => {
  const apiHost = React.useContext(HostContext);

  if (type === NodeType.Article) {
    return null;
  }

  const host = type === NodeType.HttpOperation && data.servers && data.servers[0] && data.servers[0].url;

  return (
    <div className={className}>
      <div className="py-1 flex items-center">
        {type === NodeType.HttpOperation && <Method className="mr-6" method={data && data.method} />}

        <h2 className="mb-0 font-medium text-2xl">{name}</h2>

        <div className="flex-1" />

        {versions && versions.length > 0 && <VersionSelect className="ml-3" version={version} versions={versions} />}

        {srn && apiHost && (
          <Popover
            className="ml-3"
            position={Position.TOP_RIGHT}
            content={
              <Menu>
                <MenuItem href={`${apiHost}/nodes.raw?srn=${srn}`} text="Default" target="_blank" />

                <MenuItem href={`${apiHost}/nodes.raw?srn=${srn}&deref=remote`} text="Dereferenced" target="_blank" />
              </Menu>
            }
          >
            <Button text="Export" icon={<Icon icon="export" iconSize={12} />} intent="primary" />
          </Popover>
        )}
      </div>

      {type === NodeType.HttpOperation && <Path className="mt-6 mb-2" host={host} path={data.path} />}
    </div>
  );
};
