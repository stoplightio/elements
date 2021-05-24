import { Box, Flex, Heading, HStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { flatten, sortBy } from 'lodash';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { getServiceUriFromOperation } from '../../../utils/oas/security';
import { MarkdownViewer } from '../../MarkdownViewer';
import { TryItWithRequestSamples } from '../../TryIt';
import { DocsComponentProps } from '..';
import { DeprecatedBadge, SecurityBadge } from './Badges';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = DocsComponentProps<IHttpOperation>;

const HttpOperationComponent = React.memo<HttpOperationProps>(
  ({ className, data, headless, uri, hideTryIt, hideTryItPanel }) => {
    const mocking = React.useContext(MockingContext);
    const isDeprecated = !!data.deprecated;

    const [responseMediaType, setResponseMediaType] = React.useState('');
    const [responseStatusCode, setResponseStatusCode] = React.useState('');
    const [requestBodyIndex, setTextRequestBodyIndex] = React.useState(0);

    const httpServiceUri = uri && getServiceUriFromOperation(uri);

    const securitySchemes = flatten(data.security);

    const hasBadges = isDeprecated || securitySchemes.length > 0;

    if (!headless)
      return (
        <Box bg="transparent" className={cn('HttpOperation', className)} w="full">
          <Heading size={1} fontWeight="semibold">
            {data.summary || data.iid || `${data.method} ${data.path}`}
          </Heading>

          {hasBadges && (
            <HStack spacing={2} mt={3}>
              {isDeprecated && <DeprecatedBadge />}
              {sortBy(securitySchemes, 'type').map((scheme, i) => (
                <SecurityBadge key={i} scheme={scheme} httpServiceUri={httpServiceUri} />
              ))}
            </HStack>
          )}

          <Flex mt={12}>
            <Box flex={1}>
              {data.description && (
                <MarkdownViewer className="HttpOperation__Description mb-10" markdown={data.description} />
              )}

              <Request onChange={setTextRequestBodyIndex} operation={data} />

              {data.responses && (
                <Responses
                  responses={data.responses}
                  onMediaTypeChange={setResponseMediaType}
                  onStatusCodeChange={setResponseStatusCode}
                />
              )}
            </Box>

            {!hideTryItPanel && (
              <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
                <Box className="HttpOperation__gutter">
                  <TryItWithRequestSamples
                    httpOperation={data}
                    responseMediaType={responseMediaType}
                    responseStatusCode={responseStatusCode}
                    requestBodyIndex={requestBodyIndex}
                    hideTryIt={hideTryIt}
                    mockUrl={mocking.hideMocking ? undefined : mocking.mockUrl}
                  />
                </Box>
              </Box>
            )}
          </Flex>
        </Box>
      );

    return (
      <div className={cn('HttpOperation px-5', className)}>
        {data.description && (
          <MarkdownViewer className="HttpOperation__Description mb-10 ml-1" markdown={data.description} />
        )}

        <Request onChange={setTextRequestBodyIndex} operation={data} />

        {data.responses && (
          <Responses
            responses={data.responses}
            onMediaTypeChange={setResponseMediaType}
            onStatusCodeChange={setResponseStatusCode}
          />
        )}
      </div>
    );
  },
);
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
