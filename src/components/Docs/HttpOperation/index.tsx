import { IHttpOperation } from '@stoplight/types';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { HttpMethodColors } from '../../../constants';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<Partial<IHttpOperation>>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data }) => {
  return (
    <div className={cn('HttpOperation', className)}>
      <div className="flex items-center text-2xl mb-8">
        {data.method && (
          <div
            className={cn(
              `uppercase mr-2 font-semibold`,
              `text-${HttpMethodColors[data.method]} dark:text-${HttpMethodColors[data.method]}`,
            )}
          >
            {data.method}
          </div>
        )}

        {data.path && <div className="flex-1">{data.path}</div>}
      </div>

      {data.description && <MarkdownViewer className="mb-10 HttpOperation__Description" markdown={data.description} />}

      <Request request={data.request} security={data.security} />

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, ['data'], 'HttpOperation');
