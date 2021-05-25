import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES } from '@stoplight/markdown-viewer';
import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless, nodeTitle }) => {
  const resolveRef = useInlineRefResolver();
  const title = data.title ?? nodeTitle;
  return (
    <div className={cn('Model', className)}>
      {!headless && title !== undefined && (
        <Heading size={1} mb={4} fontWeight="semibold">
          {title}
        </Heading>
      )}

      {data.description && <MarkdownViewer markdown={data.description} />}

      <JsonSchemaViewer resolveRef={resolveRef} className={cn(className, CLASSNAMES.block)} schema={data} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
