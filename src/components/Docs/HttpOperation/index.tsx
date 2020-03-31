import { IHttpOperation } from '@stoplight/types';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<Partial<IHttpOperation>>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data }) => {
  return (
    <div className={cn('HttpOperation', className)}>
      {data.description && <MarkdownViewer className="mb-10 HttpOperation__Description" markdown={data.description} />}

      <Request request={data.request} security={data.security} />

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, ['data'], 'HttpOperation');
