import { JsonSchemaViewer, ViewMode } from '@stoplight/json-schema-viewer';
import { CLASSNAMES } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import * as React from 'react';

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

export const SchemaAndDescription = ({ className, description, schema, viewMode }: ISchemaAndDescriptionProps) => {
  const resolveRef = useInlineRefResolver();
  return (
    <>
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
