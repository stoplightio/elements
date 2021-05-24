import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { SchemaAndDescription } from '../../SchemaAndDescription';
import { DocsComponentProps } from '..';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless }) => {
  return (
    <div className={cn('Model MarkdownViewer', className)}>
      {!headless && data.title !== void 0 && <Heading size={1}>{data.title}</Heading>}

      <SchemaAndDescription schema={data} description={data.description} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
