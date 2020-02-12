import { Classes, Icon, IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { IResolveError } from '@stoplight/json-ref-resolver/types';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import cn from 'classnames';
import * as React from 'react';
import { parse } from '@stoplight/yaml';

const icon: IconName = 'cube';
const color = '#ef932b';

export interface IModelProps {
  value: any;

  errors?: IResolveError[];
  className?: string;
  title?: string;
  maxRows?: number;
  actions?: React.ReactElement;
}

export function Model({ value, className, title, maxRows = 100, actions, errors = [] }: IModelProps) {
  let schema = value;
  try {
    if (typeof schema === 'string') {
      schema = parse(value);
    }
  } catch (e) {
    errors.push({
      code: 'PARSE_URI',
      message: String(e),
      path: [],
      pointerStack: [],
      // @ts-ignore
      uri: '',
      uriStack: [],
    })
  }

  return (
    <div className="Model">
      <ModelHeader title={title} actions={actions} errors={errors} />

      <JsonSchemaViewer className={className} schema={schema} maxRows={maxRows} />
    </div>
  );
}

function ModelHeader({
  title,
  actions,
  errors,
}: {
  title?: string;
  actions?: React.ReactElement;
  errors: IResolveError[];
}) {
  const hasErrors = errors && errors.length;
  if (!title && !actions && !hasErrors) {
    return null;
  }

  return (
    <div
      className={cn('flex items-center p-2', {
        'border border-b-0 dark:border-darken-3 bg-white dark:bg-gray-7': actions,
      })}
      style={{ height: 30 }}
    >
      {title && (
        <div className="flex items-center flex-1">
          <Icon icon={icon} color={color} iconSize={14} />

          <div className={cn(Classes.TEXT_MUTED, 'px-2')} style={{ fontSize: 12 }}>
            {title}
          </div>
        </div>
      )}

      <div className="flex-1" />

      <Errors errors={errors} />

      {actions}
    </div>
  );
}

function Errors({ errors }: { errors: IResolveError[] }) {
  if (!errors || !errors.length) {
    return null;
  }

  return (
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
                {error && error.uri && String(error.uri) ? (
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
  );
}
