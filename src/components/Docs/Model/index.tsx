import { JSONSchema } from '@stoplight/prism-http';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { SchemaViewer } from '../../SchemaViewer';

export type ModelProps = IDocsComponentProps<JSONSchema>;

const ModelComponent: React.FC<ModelProps> = ({ data, className }) => {
  let examples;
  if ('x-examples' in data) {
    examples = data['x-examples'];
  } else if ('examples' in data) {
    examples = data.examples;
  }

  return (
    <div className={cn('Model', className)}>
      {data.title !== void 0 && <h3 className="text-2xl mb-10">{data.title}</h3>}
      <SchemaViewer schema={data} description={data.description} examples={examples} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, ['data'], 'Model');
