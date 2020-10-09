import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { IOperation } from '../../../AST/Operation';
import { groupNodes } from '../../../AST/utils';
import { Description } from './Description';
import { Method } from './Method';
import { Path } from './Path';
import { Request } from './Request';
import { Responses } from './Responses';
import { useClasses } from './useClasses';

export type HttpOperationProps = IDocsComponentProps<IOperation>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data, headless }) => {
  const classes = useClasses(data);

  const groupedNodes = groupNodes(data.children);

  return (
    <div className={cn('HttpOperation', className, classes)}>
      {!headless && (
        <h2 className={cn(Classes.HEADING, 'flex items-center mb-10')}>
          <Method data={groupedNodes.httpMethod?.[0]}></Method>
          <Path data={groupedNodes.path?.[0]}></Path>
        </h2>
      )}

      <Description data={groupedNodes.description?.[0]} />

      <Request data={groupedNodes.request?.[0]} />

      <Responses data={groupedNodes.responses?.[0]} />
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
