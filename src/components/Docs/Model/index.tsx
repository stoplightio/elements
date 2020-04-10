import { JSONSchema } from '@stoplight/prism-http';
import { Classes } from '@stoplight/ui-kit';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { SchemaViewer } from '../../SchemaViewer';
import { getExamplesFromSchema } from '../HttpOperation/utils';

export type ModelProps = IDocsComponentProps<JSONSchema>;

const ModelComponent: React.FC<ModelProps> = ({ data, className }) => {
  return (
    <div className={cn('Model', className)}>
      {data.title !== void 0 && <h2 className={cn(Classes.HEADING, 'mb-10')}>{data.title}</h2>}
      <SchemaViewer schema={data} description={data.description} examples={getExamplesFromSchema(data)} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, ['data'], 'Model');
