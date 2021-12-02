import { Box, Flex, Heading, HStack, useThemeIsDark, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { useAtomValue } from 'jotai/utils';
import * as React from 'react';

import { HttpMethodColors } from '../../../constants';
import { MockingContext } from '../../../containers/MockingProvider';
import { useResolvedObject } from '../../../context/InlineRefResolver';
import { MarkdownViewer } from '../../MarkdownViewer';
import { chosenServerAtom, TryItWithRequestSamples } from '../../TryIt';
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

    const prettyName = (data.summary || data.iid || '').trim();
    const hasBadges = isDeprecated || isInternal;

    const header = (!layoutOptions?.noHeading || hasBadges) && (
      <VStack spacing={5}>
        <HStack spacing={5}>
          {!layoutOptions?.noHeading && prettyName ? (
            <Heading size={1} fontWeight="semibold">
              {prettyName}
            </Heading>
          ) : null}

          <HStack spacing={2}>
            {isDeprecated && <DeprecatedBadge />}
            {isInternal && <InternalBadge isHttpService />}
          </HStack>
        </HStack>

        <MethodPath method={data.method} path={data.path} />
      </VStack>
    );

    const description = (
      <VStack spacing={10}>
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

type MethodPathProps = { method: IHttpOperation['method']; path: string };

function MethodPath({ method, path }: MethodPathProps) {
  const chosenServer = useAtomValue(chosenServerAtom);

  let chosenServerUrl = '';
  if (chosenServer) {
    chosenServerUrl = chosenServer.url.endsWith('/') ? chosenServer.url.slice(0, -1) : chosenServer.url;
  }

  return (
    <Box>
      <MethodPathInner method={method} path={path} chosenServerUrl={chosenServerUrl} />
    </Box>
  );
}

function MethodPathInner({ method, path, chosenServerUrl }: MethodPathProps & { chosenServerUrl: string }) {
  const isDark = useThemeIsDark();
  const fullUrl = `${chosenServerUrl}${path}`;

  const pathElem = (
    <Flex overflowX="hidden">
      {chosenServerUrl ? (
        <Box dir="rtl" color="muted" fontSize="lg" textOverflow="truncate" overflowX="hidden">
          {chosenServerUrl}
        </Box>
      ) : null}

      <Box fontSize="lg" fontWeight="semibold" flex={1}>
        {path}
      </Box>
    </Flex>
  );

  return (
    <HStack
      spacing={3}
      pl={2.5}
      pr={4}
      py={2}
      bg="canvas-50"
      rounded="lg"
      fontFamily="mono"
      display="inline-flex"
      maxW="full"
      title={fullUrl}
    >
      <Box
        py={1}
        px={2.5}
        rounded="lg"
        bg={!isDark ? HttpMethodColors[method] : 'canvas-100'}
        color={!isDark ? 'on-primary' : 'body'}
        fontSize="lg"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        {method}
      </Box>

      {pathElem}
    </HStack>
  );
}
