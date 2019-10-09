import { Classes, Icon, IconName } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import cn from 'classnames';
import * as React from 'react';

const JSV_MAX_ROWS = 50;
const icon: IconName = 'cube';
const color = '#ef932b';

export interface IModelProps {
  schema: any;
  className?: string;
  title?: string;
  actions?: React.ReactElement;
  maxRows?: number;
}

export const Model = ({ schema, className, title, actions, maxRows }: IModelProps) => {
  return (
    <div className={className}>
      <div className="flex items-center p-2" style={{ height: 30 }}>
        {title && (
          <>
            <Icon icon={icon} color={color} iconSize={14} />

            <div className={cn(Classes.TEXT_MUTED, 'px-2')} style={{ fontSize: 12 }}>
              {title}
            </div>
          </>
        )}

        <div className="flex-1" />

        {actions}
      </div>

      <JsonSchemaViewer className="border-t" schema={schema} maxRows={maxRows || JSV_MAX_ROWS} />
    </div>
  );
};
