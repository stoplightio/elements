import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { JSONSchema } from '../../../types';
import { SchemaAndDescription } from '../../SchemaAndDescription';
import { DocsComponentProps } from '..';

export type ModelProps = DocsComponentProps<JSONSchema>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless }) => {
  return (
    <div className={cn('Model MarkdownViewer', className)}>
      {!headless && data.title !== void 0 && <h1 className={Classes.HEADING}>{data.title}</h1>}

      <SchemaAndDescription schema={data} description={data.description} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
