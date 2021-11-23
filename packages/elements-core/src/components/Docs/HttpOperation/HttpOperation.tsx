import { Heading, HStack, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { useResolvedObject } from '../../../context/InlineRefResolver';
import { MarkdownViewer } from '../../MarkdownViewer';
import { TryItWithRequestSamples } from '../../TryIt';
import { DocsComponentProps } from '..';
import { TwoColumnLayout } from '../TwoColumnLayout';
import { DeprecatedBadge, InternalBadge } from './Badges';
import { Request } from './Request';
import { Responses } from './Responses';

export type HttpOperationProps = DocsComponentProps<IHttpOperation>;

const HttpOperationComponent = React.memo<HttpOperationProps>(
  ({ className, data: unresolvedData, layoutOptions, tryItCredentialsPolicy, tryItCorsProxy }) => {
    const data = useResolvedObject(unresolvedData) as IHttpOperation;

    const mocking = React.useContext(MockingContext);
    const isDeprecated = !!data.deprecated;
    const isInternal = !!data.internal;

    const [responseMediaType, setResponseMediaType] = React.useState('');
    const [responseStatusCode, setResponseStatusCode] = React.useState('');
    const [requestBodyIndex, setTextRequestBodyIndex] = React.useState(0);

    const hasBadges = isDeprecated || isInternal;

    const header = (!layoutOptions?.noHeading || hasBadges) && (
      <>
        {!layoutOptions?.noHeading && (
          <Heading size={1} mb={4} fontWeight="semibold">
            {data.summary || data.iid || `${data.method} ${data.path}`}
          </Heading>
        )}

        {hasBadges && (
          <HStack spacing={2}>
            {isDeprecated && <DeprecatedBadge />}
            {isInternal && <InternalBadge isHttpService />}
          </HStack>
        )}
      </>
    );

    const description = (
      <VStack spacing={6}>
        {data.description && <MarkdownViewer className="HttpOperation__Description" markdown={data.description} />}

        <Request onChange={setTextRequestBodyIndex} operation={data} />

        {data.responses && (
          <Responses
            responses={data.responses}
            onMediaTypeChange={setResponseMediaType}
            onStatusCodeChange={setResponseStatusCode}
          />
        )}
      </VStack>
    );

    const tryItPanel = !layoutOptions?.hideTryItPanel && (
      <TryItWithRequestSamples
        httpOperation={data}
        responseMediaType={responseMediaType}
        responseStatusCode={responseStatusCode}
        requestBodyIndex={requestBodyIndex}
        hideTryIt={layoutOptions?.hideTryIt}
        tryItCredentialsPolicy={tryItCredentialsPolicy}
        mockUrl={mocking.hideMocking ? undefined : mocking.mockUrl}
        corsProxy={tryItCorsProxy}
      />
    );

    return (
      <TwoColumnLayout
        className={cn('HttpOperation', className)}
        header={header}
        left={description}
        right={tryItPanel}
      />
    );
  },
);
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<HttpOperationProps>(HttpOperationComponent, {
  recoverableProps: ['data'],
});
