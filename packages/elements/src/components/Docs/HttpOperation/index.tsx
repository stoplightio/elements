import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { HttpMethodColors } from '../../../constants';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DeprecatedBadge } from './Badges';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<Partial<IHttpOperation>>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data, headless }) => {
  const color = HttpMethodColors[data.method!] || 'gray';

  const isDeprecated = !!data.deprecated;

  return (
    <div className={cn('HttpOperation', className)}>
      {!headless && (
        <div className="mb-10">
          <h2 className={cn(Classes.HEADING, 'flex items-center')}>
            <div
              className={cn(
                `uppercase mr-5 font-semibold border rounded py-1 px-2`,
                `text-${color}`,
                `border-${color}`,
              )}
            >
              {data.method || 'UNKNOWN'}
            </div>

            {data.path && <div className="flex-1 font-medium text-gray-6 dark:text-gray-3 break-all">{data.path}</div>}
          </h2>
          {isDeprecated && <DeprecatedBadge />}
        </div>
      )}

      <MarkdownViewer
        className="HttpOperation__Description mb-10 ml-1"
        markdown={data.description || '*No description.*'}
      />

      <Request request={data.request} security={data.security} />

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
