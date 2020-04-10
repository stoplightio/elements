import { IHttpOperation } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
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
      <h2 className={cn(Classes.HEADING, 'flex items-center mb-10')}>
        <div
          className={cn(
            `uppercase mr-4 font-semibold`,
            `text-${HttpMethodColors[data.method!] || 'gray'} dark:text-${HttpMethodColors[data.method!] || 'gray'}`,
          )}
        >
          {data.method || 'UNKOWN'}
        </div>

        {data.path && <div className="flex-1">{data.path}</div>}
      </h2>

      {data.description && <MarkdownViewer className="mb-10 HttpOperation__Description" markdown={data.description} />}

      <Request request={data.request} security={data.security} />

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, ['data'], 'HttpOperation');
