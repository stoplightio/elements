import { Classes, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JsonSchemaViewer, ViewMode } from '@stoplight/json-schema-viewer';
import { CLASSNAMES } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { NodeTypeColors, NodeTypeIconDefs } from '../../constants';
import { useInlineRefResolver } from '../../context/InlineRefResolver';
import { JSONSchema } from '../../types';
import { MarkdownViewer } from '../MarkdownViewer';

interface ISchemaAndDescriptionProps {
  schema: JSONSchema;
  title?: string;
  description?: string;
  errors?: string[];
  className?: string;
  viewMode?: ViewMode;
}

export const SchemaAndDescription = ({
  className,
  title,
  description,
  schema,
  errors,
  viewMode,
}: ISchemaAndDescriptionProps) => {
  const resolveRef = useInlineRefResolver();
  return (
    <>
      <SchemaTitle title={title} errors={errors} />

      {description && <MarkdownViewer markdown={description} />}

      <JsonSchemaViewer
        resolveRef={resolveRef}
        className={cn(className, CLASSNAMES.block)}
        schema={schema}
        viewMode={viewMode}
      />
    </>
  );
};

const SchemaTitle = ({ title, errors }: { title?: string; errors?: string[] }) => {
  const hasErrors = errors && errors.length;
  if (!title && !hasErrors) {
    return null;
  }

  return (
    <div className={cn('MV_block_header flex items-center p-2')} style={{ height: 30 }}>
      {title && (
        <div className="flex items-center flex-1">
          <FontAwesomeIcon icon={NodeTypeIconDefs[NodeType.Model]} color={NodeTypeColors[NodeType.Model]} />
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
