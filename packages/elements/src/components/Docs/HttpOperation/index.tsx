import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { HttpMethodColors } from '../../../constants';
import { useClasses } from '../../../hooks/useClasses';
import { useClick } from '../../../hooks/useClick';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<Partial<IHttpOperation>>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data, headless }) => {
  const onClick = useClick(data);
  const classes = useClasses(data);
  const onMethodClick = useClick(data, 'method');
  const methodClasses = useClasses(data, 'method');
  const onPathClick = useClick(data, 'path');
  const pathClasses = useClasses(data, 'path');
  const onDescriptionClick = useClick(data, 'description');
  const descriptionClasses = useClasses(data, 'description');
  const color = HttpMethodColors[data.method!] || 'gray';

  return (
    <div className={cn('HttpOperation', className, classes)} onClick={onClick}>
      {!headless && (
        <h2 className={cn(Classes.HEADING, 'flex items-center mb-10')}>
          <div
            className={cn(
              `HttpOperation__Method uppercase mr-5 font-semibold border rounded py-1 px-2`,
              `text-${color}`,
              `border-${color}`,
              methodClasses,
            )}
            onClick={onMethodClick}
          >
            {data.method || 'UNKNOWN'}
          </div>

          {data.path && (
            <div
              className={cn(
                'HttpOperation__Path flex-1 font-medium text-gray-6 dark:text-gray-3 break-all',
                pathClasses,
              )}
              onClick={onPathClick}
            >
              {data.path}
            </div>
          )}
        </h2>
      )}

      <MarkdownViewer
        className={cn('HttpOperation__Description mb-10 ml-1', descriptionClasses)}
        markdown={data.description || '*No description.*'}
        onClick={onDescriptionClick}
      />

      {data.request && <Request request={data.request} security={data.security} />}

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
