import { Classes, Icon, IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Dictionary } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit/CodeViewer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { JSONSchema4 } from 'json-schema';
import { isEmpty, map } from 'lodash';
import * as React from 'react';

import { InlineRefResolverContext } from '../../containers/Provider';

export interface ISchemaViewerProps {
  schema: JSONSchema4;
  title?: string;
  errors?: string[];
  maxRows?: number;
  examples?: Dictionary<string>;
  className?: string;
}

const JSV_MAX_ROWS = 20;
export const SchemaViewer = ({
  className,
  title,
  schema,
  examples,
  errors,
  maxRows = JSV_MAX_ROWS,
}: ISchemaViewerProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const resolveRef = React.useContext(InlineRefResolverContext);

  const renderJSV = () => {
    return (
      <>
        <SchemaTitle title={title} errors={errors} />
        <JsonSchemaViewer className={className} schema={schema} maxRows={maxRows} resolveRef={resolveRef} />
      </>
    );
  };

  if (!isEmpty(examples)) {
    return renderJSV();
  }

  return (
    <SimpleTabs className={cn('SchemaViewer', className)} selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      <SimpleTabList>
        <SimpleTab>Schema</SimpleTab>

        {map(examples, (_, key) => (
          <SimpleTab key={key}>{key}</SimpleTab>
        ))}
      </SimpleTabList>

      <SimpleTabPanel className="p-0">{renderJSV()}</SimpleTabPanel>

      {map(examples, (example, key) => (
        <SimpleTabPanel key={key} className="p-0">
          <CodeViewer showLineNumbers className="py-4 overflow-auto max-h-400px" value={example} />
        </SimpleTabPanel>
      ))}
    </SimpleTabs>
  );
};

const icon: IconName = 'cube';
const color = '#ef932b';
function SchemaTitle({ title, actions, errors }: { title?: string; actions?: React.ReactElement; errors?: string[] }) {
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

      {errors && <Errors errors={errors} />}

      {actions}
    </div>
  );
}

function Errors({ errors }: { errors: string[] }) {
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
                {error}
              </li>
            );
          })}
        </div>
      }
    />
  );
}
