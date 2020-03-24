import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import { isObject } from 'lodash';
import * as React from 'react';

import { useParsedValue } from '../../../hooks/useParsedValue';
import { IBranchNode } from '../../../types';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends IErrorBoundary {
  node: IBranchNode;

  className?: string;
}

const isHttpOperation = (maybeHttpOperation: unknown): maybeHttpOperation is IHttpOperation => {
  return isObject(maybeHttpOperation) && 'method' in maybeHttpOperation;
};

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, node }) => {
  const result = useParsedValue(node.snapshot.data);

  if (!isHttpOperation(result)) return null;

  return (
    <div className={cn('HttpOperation', className)}>
      {result.description && (
        <MarkdownViewer className="mb-10 HttpOperation__Description" markdown={result.description} />
      )}

      <Request request={result.request} security={result.security} />

      <Responses responses={result.responses} />
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<IHttpOperationProps>(HttpOperationComponent, ['node'], 'HttpOperation');
