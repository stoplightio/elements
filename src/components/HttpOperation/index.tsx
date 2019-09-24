import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends IErrorBoundary {
  className?: string;
  value: IHttpOperation;
}

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError(
      `Expected http operation value to be an object but received ${value === null ? 'null' : typeof value}`,
    );
  }

  return (
    <div className={cn('HttpOperation', className)}>
      {value.description && (
        <MarkdownViewer className="HttpOperation__Description mb-10" markdown={value.description} />
      )}

      <Request request={value.request} />

      <Responses responses={value.responses} />
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<IHttpOperationProps>(HttpOperationComponent, ['value'], 'HttpOperation');
