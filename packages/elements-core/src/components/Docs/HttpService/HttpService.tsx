import { Box, Flex, Heading, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { PoweredByLink } from '../../PoweredByLink';
import { DocsComponentProps } from '..';
import { Badge } from '../HttpOperation/Badges';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = DocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data, headless, location = {} }) => {
  const { search, pathname } = location;
  const mocking = React.useContext(MockingContext);
  const query = new URLSearchParams(search);

  const description = data.description && <MarkdownViewer className="sl-mb-10" markdown={data.description} />;

  const dataPanel = (
    <VStack spacing={6}>
      {(data.servers ?? mocking.mockUrl) && <ServerInfo servers={data.servers} mockUrl={mocking.mockUrl} />}
      <Box>
        {data.securitySchemes?.length && (
          <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
        )}
      </Box>
    </VStack>
  );

  return (
    <Box className={className} w="full">
      {data.name && (
        <Heading size={1} fontWeight="semibold">
          {data.name}
        </Heading>
      )}

      {data.version && (
        <Box mt={3}>
          <Badge className="sl-bg-gray-6">{enhanceVersionString(data.version)}</Badge>
        </Box>
      )}

      {!headless ? (
        <Flex mt={12}>
          <Box flex={1}>{description}</Box>
          <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
            {dataPanel}
          </Box>
        </Flex>
      ) : (
        <Box mb={10}>
          {description}
          {pathname && (
            <PoweredByLink source={data.name ?? 'no-title'} pathname={pathname} packageType="elements" headless />
          )}
          {dataPanel}
        </Box>
      )}
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });
