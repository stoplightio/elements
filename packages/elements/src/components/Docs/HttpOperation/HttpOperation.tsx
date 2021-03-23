import { Box, Heading } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { flatten, sortBy } from 'lodash';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { ActiveInfoContext, StoplightProjectContext } from '../../../containers/Provider';
import { getServiceUriFromOperation } from '../../../utils/oas/security';
import { MarkdownViewer } from '../../MarkdownViewer';
import { TryItWithRequestSamples } from '../../TryIt';
import { DeprecatedBadge, SecurityBadge } from './Badges';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = IDocsComponentProps<IHttpOperation>;

const HttpOperationComponent = React.memo<HttpOperationProps>(({ className, data, headless, uri }) => {
  const info = React.useContext(ActiveInfoContext);
  const context = React.useContext(StoplightProjectContext);
  const isDeprecated = !!data.deprecated;

  const httpServiceUri = uri && getServiceUriFromOperation(uri);

  const securitySchemes = flatten(data.security);

  if (!headless)
    return (
      <Box bg="transparent" className={cn('HttpOperation', className)} w="full">
        <Heading size={1} fontWeight="semibold" fontSize="5xl">
          {data.summary || `${data.method} ${data.path}`}
        </Heading>
        <div className="flex flex-rows mt-3">
          <div className="flex-grow">
            <div className="flex flex-wrap mb-10">
              {isDeprecated && <DeprecatedBadge />}
              {sortBy(securitySchemes, 'type').map((scheme, i) => (
                <SecurityBadge key={i} scheme={scheme} httpServiceUri={httpServiceUri} />
              ))}
            </div>
            {data.description && (
              <MarkdownViewer className="HttpOperation__Description mb-10 ml-1" markdown={data.description} />
            )}

            <Request operation={data} />

            {data.responses && <Responses responses={data.responses} />}
          </div>

          <div className="w-2/5 relative ml-10">
            <div className="inset-0 overflow-auto">
              {info.isStoplightProjectComponent ? (
                <TryItWithRequestSamples httpOperation={data} showMocking mockUrl={context.mockUrl?.servicePath} />
              ) : (
                <TryItWithRequestSamples httpOperation={data} />
              )}
            </div>
          </div>
        </div>
      </Box>
    );

  return (
    <div className={cn('HttpOperation', className)}>
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
