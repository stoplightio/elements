import { Classes, Icon, IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { useResolver } from '../../hooks/useResolver';
import { IDiagnostic } from '../../types';
import { SchemaViewer } from '../SchemaViewer/SchemaViewer';

const icon: IconName = 'cube';
const color = '#ef932b';

export interface IModelProps {
  value: any;

  errors?: IDiagnostic[];
  className?: string;
  title?: string;
  maxRows?: number;
  actions?: React.ReactElement;
}

export function Model({ value, className, title, maxRows = 50, actions, errors = [] }: IModelProps) {
  const { result } = useResolver(NodeType.Model, value);

  return (
    <div className="Model">
      <ModelHeader title={title} actions={actions} errors={errors} />

      <SchemaViewer className={className} schema={result} maxRows={maxRows} />
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
  errors: IDiagnostic[];
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

function Errors({ errors }: { errors: IDiagnostic[] }) {
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
                {error.message}
              </li>
            );
          })}
        </div>
      }
    />
  );
}
