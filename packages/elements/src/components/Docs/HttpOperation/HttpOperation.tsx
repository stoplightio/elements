import { Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { flatten, sortBy } from 'lodash';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { getServiceUriFromOperation } from '../../../utils/oas/security';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DeprecatedBadge, SecurityBadge } from './Badges';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<IHttpOperation>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data, headless, uri }) => {
  const isDeprecated = !!data.deprecated;

  const httpServiceUri = uri && getServiceUriFromOperation(uri);

  const securitySchemes = flatten(data.security);

  return (
    <div className={cn('HttpOperation', className)}>
      {!headless && (
        <div className="mb-10">
          <Heading size={1} fontWeight="semibold" fontSize="5xl">
            {data.summary || `${data.method} ${data.path}`}
          </Heading>
          <div className="flex flex-wrap mt-1">
            {isDeprecated && <DeprecatedBadge />}
            {sortBy(securitySchemes, 'type').map((scheme, i) => (
              <SecurityBadge key={i} scheme={scheme} httpServiceUri={httpServiceUri} />
            ))}
          </div>
        </div>
      )}

      {data.description && (
        <MarkdownViewer className="HttpOperation__Description mb-10 ml-1" markdown={data.description} />
      )}

      <Request operation={data} />

      {data.responses && <Responses responses={data.responses} />}
    </div>
  );
});
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
