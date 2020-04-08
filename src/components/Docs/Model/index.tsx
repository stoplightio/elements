import { JSONSchema } from '@stoplight/prism-http';
import { Classes } from '@stoplight/ui-kit';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { SchemaViewer } from '../../SchemaViewer';
import { getExamplesFromSchema } from '../HttpOperation/utils';

export type ModelProps = IDocsComponentProps<JSONSchema>;

const ModelComponent: React.FC<ModelProps> = ({ data, className }) => {
  return (
    <div className={cn('Model MarkdownViewer', className)}>
      {data.title !== void 0 && <h1 className={Classes.HEADING}>{data.title}</h1>}

      <SchemaViewer schema={data} description={data.description} examples={getExamplesFromSchema(data)} maxRows={50} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
