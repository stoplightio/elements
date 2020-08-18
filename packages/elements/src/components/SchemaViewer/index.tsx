import { Classes, Icon, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES } from '@stoplight/markdown-viewer';
import { JSONSchema } from '@stoplight/prism-http';
import { Dictionary } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit/CodeViewer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { JSONSchema4 } from 'json-schema';
import { isEmpty, map } from 'lodash';
import * as React from 'react';

import { NodeTypeColors, NodeTypeIcons } from '../../constants';
import { InlineRefResolverContext } from '../../containers/Provider';
import { MarkdownViewer } from '../MarkdownViewer';

export interface ISchemaViewerProps {
  schema: JSONSchema;
  title?: string;
  description?: string;
  errors?: string[];
  maxRows?: number;
  examples?: Dictionary<string>;
  className?: string;
  forceShowTabs?: boolean;
}

const JSV_MAX_ROWS = 20;
export const SchemaViewer = ({
  className,
  title,
  description,
  schema,
  examples,
  errors,
  maxRows = JSV_MAX_ROWS,
  forceShowTabs,
}: ISchemaViewerProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const resolveRef = React.useContext(InlineRefResolverContext);

  const JSV = ({ jsvClassName }: { jsvClassName?: string }) => {
    return (
      <>
        <SchemaTitle title={title} errors={errors} />

        {description && <MarkdownViewer markdown={description} />}

        <JsonSchemaViewer
          mergeAllOf
          resolveRef={resolveRef}
          className={jsvClassName}
          schema={schema as JSONSchema4}
          maxRows={maxRows}
          shouldResolveEagerly
        />
      </>
    );
  };

  if (isEmpty(examples) && !forceShowTabs) {
    return <JSV jsvClassName={cn(className, 'dark:border-gray-9', CLASSNAMES.bordered, CLASSNAMES.block)} />;
  }

  return (
    <SimpleTabs
      className={cn('SchemaViewer', className)}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      forceRenderTabPanel
    >
      <SimpleTabList>
        <SimpleTab>Schema</SimpleTab>

        {map(examples, (_, key) => (
          <SimpleTab key={key}>{key === 'default' ? 'Example' : key}</SimpleTab>
        ))}
      </SimpleTabList>

      <SimpleTabPanel className="p-0">{<JSV />}</SimpleTabPanel>

      {map(examples, (example, key) => {
        return (
          <SimpleTabPanel key={key} className="p-0">
            <CodeViewer
              language="json"
              showLineNumbers
              className="py-4 px-4 overflow-auto max-h-400px"
              value={safeStringify(example, undefined, 2) || ''}
            />
          </SimpleTabPanel>
        );
      })}
    </SimpleTabs>
  );
};

const SchemaTitle = ({ title, errors }: { title?: string; errors?: string[] }) => {
  const hasErrors = errors && errors.length;
  if (!title && !hasErrors) {
    return null;
  }

  return (
    <div className={cn('flex items-center p-2')} style={{ height: 30 }}>
      {title && (
        <div className="flex items-center flex-1">
          <Icon icon={NodeTypeIcons['model']} color={NodeTypeColors['model']} iconSize={14} />

          <div className={cn(Classes.TEXT_MUTED, 'px-2')} style={{ fontSize: 12 }}>
            {title}
          </div>
        </div>
      )}

      <div className="flex-1" />

      {errors && <Errors errors={errors} />}
    </div>
  );
};

const Errors = ({ errors }: { errors: string[] }) => {
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
};
