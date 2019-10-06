import { IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { IResolveError } from '@stoplight/json-ref-resolver/types';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { BlockHeader } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import * as React from 'react';

const JSV_MAX_ROWS = 50;
const icon: IconName = 'cube';
const color = '#ef932b';

export interface IModelProps {
  schema: any;
  className?: string;
  title?: string;
  errors?: IResolveError[];
}

export const Model = ({ schema, className, title, errors }: IModelProps) => {
  return (
    <div className="Model">
      {title && <BlockHeader icon={icon} iconColor={color} title={title} />}

      {errors && errors.length > 0 && (
        <div className="w-full flex justify-end">
          <Popover
            interactionKind={PopoverInteractionKind.HOVER}
            target={
              <Tag intent={Intent.DANGER}>
                {errors.length} Error{errors.length > 1 && 's'}
              </Tag>
            }
            content={
              <div
                className={cn('p-6 max-w-md break-all', {
                  'list-none': errors.length === 1,
                })}
              >
                {errors.map((error, index) => {
                  return (
                    <li key={index} className={index > 1 ? 'mt-3' : ''}>
                      {error && error.uri ? (
                        <>
                          Failed to resolve{' '}
                          <a href={String(error.uri)} target="_blank">
                            {String(error.uri)}
                          </a>
                        </>
                      ) : (
                        error.message
                      )}
                    </li>
                  );
                })}
              </div>
            }
          />
        </div>
      )}

      <div className={className}>
        <JsonSchemaViewer schema={schema} maxRows={JSV_MAX_ROWS} />
      </div>
    </div>
  );
};
