import { MarkdownViewer } from '@stoplight/elements-core/components/MarkdownViewer';
import { useInlineRefResolver } from '@stoplight/elements-core/context/InlineRefResolver';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES } from '@stoplight/markdown-viewer';
import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { DocsComponentProps } from '..';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless }) => {
  const resolveRef = useInlineRefResolver();
  return (
    <div className={cn('Model', className)}>
      {!headless && data.title !== void 0 && (
        <Heading size={1} mb={4} fontWeight="semibold">
          {data.title}
        </Heading>
      )}

      {data.description && <MarkdownViewer markdown={data.description} />}

      <JsonSchemaViewer resolveRef={resolveRef} className={cn(className, CLASSNAMES.block)} schema={data} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
