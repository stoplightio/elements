import { HStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { SchemaAndDescription } from '../../SchemaAndDescription';
import { DocsComponentProps } from '..';
import { InternalBadge } from '../HttpOperation/Badges';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless }) => {
  const isInternal = !!data['x-internal'];

  return (
    <div className={cn('Model MarkdownViewer', className)}>
      {!headless && data.title !== void 0 && <h1 className={Classes.HEADING}>{data.title}</h1>}

      {isInternal && (
        <HStack spacing={2} mt={3} mb={12}>
          <InternalBadge />
        </HStack>
      )}
      <SchemaAndDescription schema={data} description={data.description} />
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
