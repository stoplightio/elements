import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { JSONSchema } from '../../../types';
import { SchemaViewer } from '../../SchemaViewer';
import { getExamplesFromSchema } from '../HttpOperation/utils';

export type ModelProps = IDocsComponentProps<JSONSchema>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless }) => {
  return (
    <div className={cn('Model MarkdownViewer', className)}>
      {!headless && data.title !== void 0 && <h1 className={Classes.HEADING}>{data.title}</h1>}

      <SchemaViewer schema={data} description={data.description} examples={getExamplesFromSchema(data)} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
