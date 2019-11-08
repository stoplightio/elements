import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperation, NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useResolver } from '../../hooks/useResolver';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends IErrorBoundary {
  value: any;

  className?: string;
}

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);

  if (typeof result !== 'object' || result === null) {
    throw new TypeError(
      `Expected http operation value to be an object but received ${result === null ? 'null' : typeof result}`,
    );
  }

  return (
    <div className={cn('HttpOperation', className)}>
      {result.description && (
        <MarkdownViewer className="HttpOperation__Description mb-10" markdown={result.description} />
      )}

      <Request request={result.request} security={result.security} />

      <Responses responses={result.responses} />
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<IHttpOperationProps>(HttpOperationComponent, ['value'], 'HttpOperation');
